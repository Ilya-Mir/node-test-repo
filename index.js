const repl = require('repl');

globalThis.getRandomNumber = () => {
  return Math.floor(Math.random() * 10);
}

console.log('3 test nodemon output');

repl.start('$ ');
