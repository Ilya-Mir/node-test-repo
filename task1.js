export class EventEmitter {
  listeners = {};  // key-value pair

  addListener(eventName, fn) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].push({fn: fn, isOnce: false});
    } else {
      this.listeners[eventName] = [{fn: fn, isOnce: false}];
    }
  }

  on(eventName, fn) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].push({fn: fn, isOnce: false});
    } else {
      this.listeners[eventName] = [{fn: fn, isOnce: false}];
    }
  }

  removeListener(eventName, fn) {
    for (const listenerIndex in this.listeners[eventName]) {
      if (this.listeners[eventName][listenerIndex].fn === fn) {
        delete this.listeners[eventName].splice(listenerIndex, 1);
      }
    }
  }

  off(eventName, fn) {
    for (const listenerIndex in this.listeners[eventName]) {
      if (this.listeners[eventName][listenerIndex].fn === fn) {
        delete this.listeners[eventName].splice(listenerIndex, 1);
      }
    }
  }

  once(eventName, fn) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].push({fn: fn, isOnce: true});
    } else {
      this.listeners[eventName] = [{fn: fn, isOnce: true}];
    }
  }

  emit(eventName, ...args) {
    for (const listenerIndex in this.listeners[eventName]) {
      this.listeners[eventName][listenerIndex].fn(...args);
      if (this.listeners[eventName][listenerIndex].isOnce) {
        delete this.listeners[eventName].splice(listenerIndex, 1);
      }
    }
  }

  listenerCount(eventName) {
    return Object.keys(this.listeners[eventName]).length;
  }

  rawListeners(eventName) {
    let rawArray = [];
    for (const listenerIndex in this.listeners[eventName]) {
      if (this.listeners[eventName][listenerIndex].isOnce) {
        rawArray.push(this.listeners[eventName][listenerIndex]);
      } else {
        rawArray.push(this.listeners[eventName][listenerIndex].fn);
      }
    }
    return rawArray
  }
}

const myEmitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));
