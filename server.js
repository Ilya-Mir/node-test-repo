import http from 'http';
import {router} from './router.js';

global.users = [
  {
    id: 1,
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: 2,
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.warn(global.users, "before");
  router(req, res);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
