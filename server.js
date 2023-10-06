import http from 'http';
import {router} from './router.js';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  router(req, res);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
