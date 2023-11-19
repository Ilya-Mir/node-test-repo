import {createUserHandler, deleteUserHandler, updateUserHandler, getCartById} from './controllers/usersControllers.js';
import {addHobbyHandler, deleteHobbyHandler, getHobbiesListHandler} from './controllers/hobbiesController.js';


export const router = (req, res) => {
  const url = new URL(`http://localhost:3000${req.url}`);
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      body = JSON.parse(body);

      if (url.pathname === '/users') {
        createUserHandler(body, res);
      }

      if (url.pathname === '/hobbies') {
        addHobbyHandler(body.id, body.hobby, res);
      }
    });
  }

  if (req.method === 'DELETE') {
    if (url.pathname === '/users') {
      const id = url.searchParams.get("id");
      deleteUserHandler(id, res);
    }

    if (url.pathname === '/hobbies') {
      const id = url.searchParams.get("id");
      const hobby = url.searchParams.get("hobby");
      deleteHobbyHandler(id, hobby, res);
    }
  }

  if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      body = JSON.parse(body);

      if (url.pathname === '/users') {
        updateUserHandler(body, res);
      }
    });
  }

  if (req.method === 'GET') {
    if (url.pathname === '/users') {
      const id = url.searchParams.get("id");
      getCartById(id, res);
    }

    if (url.pathname === '/hobbies') {
      const id = url.searchParams.get("id");
      getHobbiesListHandler(id, res);
    }
  }
};

