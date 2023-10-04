import {addHobby, getHobbiesByUser, removeHobby} from '../services/hobbiesService.js';

export const addHobbyHandler = (id, hobby, res) => {
  const result = addHobby(global.users, id, hobby)
  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 201;
    res.end("Successfully add hobby");
  }
}

export const deleteHobbyHandler = (id, hobby, res) => {
  const result = removeHobby(global.users, id, hobby)

  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.end("Successfully remove hobby");
  }
}

export const getHobbiesListHandler = (id, res) => {
  const result = getHobbiesByUser(global.users, id);

  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.setHeader('Cache-Control', 'max-age=60000');
    res.end(JSON.stringify(result));
  }
}
