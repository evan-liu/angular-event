# angular-event

Angular scope event wrapper. 

[Demo](http://plnkr.co/Lvw8BG)

## Install

[![Bower](https://img.shields.io/bower/v/angular-event.svg)]()

```sh
bower install angular-event  
```

```javascript
angular.module('app', ['ng.event']);
```

## Use as global events

### Define the event service

```javascript
angular.module('demo')
  .factory('evtDemoTriggered', evtDemoTriggered);
  
function evtDemoTriggered(event) {
  return event('demo:triggered');
}  
```

### Inject and dispatch the event

```javascript
angular.module('demo')
  .factory('demoTrigger', demoTrigger);
  
function demoTrigger(evtDemoTriggered) {
  function trigger() {
    evtDemoTriggered.emit();
  }
}  
```
  
### Inject and listen to the event

```javascript
angular.module('demo')
  .factory('demoModel', demoModel);

function demoModel(evtDemoTriggered) {
  evtDemoTriggered.on(onDemoTriggered);
  function onDemoTriggered() {
    //...
  }
}
```    

## Use as an instance event

### Define and dispatch the instance event

```javascript
angular.module('demo')
  .factory('demoModel', demoModel);
  
function demoModel(event) {
  var model = {
    value: 0,
    evtUpdate: event('demo:model:update')
  };
  return model;
  
  function demo() {
    model.value++;
    model.evtUpdate.emit(model.value);
  }
}
```

### Inject and listen to the event

```javascript
angular.module('demo')
  .controller('demoController', demoController);

function demoController(demoModel) {
  demoModel.evtUpdate.on(onModelUpdate);
  function onModelUpdate(event, value) {
    alert('Model updated: ' + value);
  }
}
```    

## API

### event(name, scope?)

Create a wrapper for `name` event of `scope` (or `$rootScope` if scope is omitted).  

#### on(cb)

Wrapper for `scope.$on(name, cb);`

#### once(cb)

Remove the listener automatically after triggered once. 

#### off(cb)

Deregister the listener.
 
#### emit()

Wrapper for `scope.$emit()`

#### broadcast()

Wrapper for `scope.$broadcast()`

