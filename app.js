const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', () => {
  console.log('Listener 1');
});


eventEmitter.on("myEvent", () => {
  console.log("Listener 2");
});

eventEmitter.once("myEvent", () => {
  console.log("Listener 3");
});
const listeners2 = eventEmitter.rawListeners('myEvent');
console.warn(listeners2);
eventEmitter.emit('myEvent');
eventEmitter.emit('myEvent');


const listeners = eventEmitter.rawListeners('myEvent');
console.warn(listeners);
