describe('ng.event.event', function () {

  /** @type {ng.event.eventFactory} */
  var event;

  var $rootScope;
  beforeEach(module('ng.event'));
  beforeEach(inject(function (_event_, _$rootScope_) {
    event = _event_;
    $rootScope = _$rootScope_;
  }));

  describe('on()', function () {
    it('should call callback', function () {
      var testEvent = event('test');

      var cb = jasmine.createSpy('cb');
      testEvent.on(cb);

      testEvent.emit(1, 2, 3);

      expect(cb).toHaveBeenCalledWith(jasmine.any(Object), 1, 2, 3);
    });

    it('should return deregister method', function () {
      var testEvent = event('test');

      var cb = jasmine.createSpy('cb');
      testEvent.on(cb)();

      testEvent.emit(1, 2, 3);

      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe('off()', function () {
    it('should stop calling callback', function () {
      var testEvent = event('test');

      var cb = jasmine.createSpy('cb');
      testEvent.on(cb);
      testEvent.off(cb);

      testEvent.emit(1, 2, 3);

      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe('once()', function () {
    it('should call callback only once', function () {
      var testEvent = event('test');

      var called = 0;
      function cb() {
        called++;
      }

      testEvent.once(cb);

      testEvent.emit(1);
      testEvent.emit(2);
      testEvent.emit(3);

      expect(called).toBe(1);
    });
  });

  describe('emit()', function () {
    it('should emit up', function () {
      var scope1 = $rootScope.$new();
      var scope2 = scope1.$new();
      var scope3 = scope2.$new();

      var cb1 = jasmine.createSpy('cb1');
      var cb2 = jasmine.createSpy('cb2');
      var cb3 = jasmine.createSpy('cb3');

      scope1.$on('test', cb1);
      scope2.$on('test', cb2);
      scope3.$on('test', cb3);

      var evt = event('test', scope2);
      evt.emit(1, 2, 3);

      expect(cb1).toHaveBeenCalled();
      expect(cb2).toHaveBeenCalledWith(jasmine.any(Object), 1, 2, 3);
      expect(cb3).not.toHaveBeenCalled();
    });
  });

  describe('broadcast()', function () {
    it('should broadcast down', function () {
      var scope1 = $rootScope.$new();
      var scope2 = scope1.$new();
      var scope3 = scope2.$new();

      var cb1 = jasmine.createSpy('cb1');
      var cb2 = jasmine.createSpy('cb2');
      var cb3 = jasmine.createSpy('cb3');

      scope1.$on('test', cb1);
      scope2.$on('test', cb2);
      scope3.$on('test', cb3);

      var evt = event('test', scope2);
      evt.broadcast(1, 2, 3);

      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalledWith(jasmine.any(Object), 1, 2, 3);
      expect(cb3).toHaveBeenCalled();
    });
  });

});
