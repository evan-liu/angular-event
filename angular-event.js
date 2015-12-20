(function () {
  "use strict";

  angular
    .module('ng.event', ['ng'])
    .factory('event', event);

  function event($rootScope) {
    return eventFactory;

    /**
     * @callback ng.event.eventFactory
     *
     * @param {string} name Event name.
     * @param {ng.IScope?} scope Target scope. Default: $rootScope.
     *
     * @return {ng.event.Event}
     */
    function eventFactory(name, scope) {
      /**
       * @namespace ng.event.Event
       */
      var event = {
        on: on,
        off: off,
        once: once,
        emit: emit,
        broadcast: broadcast
      };

      scope = scope || $rootScope;
      var deregisterName = '__ng_event_deregister_' + name;

      return event;

      function on(cb) {
        cb[deregisterName] = scope.$on(name, cb);
        return cb[deregisterName];
      }

      function off(cb) {
        cb[deregisterName] && cb[deregisterName]();
      }

      function once(cb, thisObject) {
        var deregister = scope.$on(name, handler);

        function handler() {
          cb.apply(thisObject, arguments);
          deregister();
        }
      }

      function emit() {
        dispatch('$emit', arguments);
      }

      function broadcast() {
        dispatch('$broadcast', arguments);
      }

      function dispatch(method, args) {
        if (args.length > 0) {
          args = Array.prototype.slice.apply(args);
          args.unshift(name);
        } else {
          args = [name];
        }
        scope[method].apply(scope, args);
      }
    }
  }

  event.$inject = ['$rootScope'];

})();