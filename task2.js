import {EventEmitter} from "./task1.js";

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    const before = Date.now();
    this.emit("begin");
    asyncFunc(...args).then((res) => {
      this.emit("end");
      const after = Date.now();
      console.log("Processing time:", after - before, 'ms');
      return res.json();
    }).then((data) => {
      this.emit("data", data);
    });
  }
};

const withTime = new WithTime();
withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('data', data));

withTime.execute(() => fetch('https://jsonplaceholder.typicode.com/posts/1'));

console.log(withTime.rawListeners("end"));
