import {addHobby, getHobbiesByUser, removeHobby} from '../services/hobbiesService.js';


export const addHobbyHandler = (id, hobby, res) => {
  const result = addHobby(id, hobby);
  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 201;
    res.end("Successfully add hobby");
  }
};

export const deleteHobbyHandler = (id, hobby, res) => {
  const result = removeHobby(id, hobby);

  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.end("Successfully remove hobby");
  }
};

export const getHobbiesListHandler = (id, res) => {
  const result = getHobbiesByUser(id);

  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.setHeader('Cache-Control', 'max-age=60000');
    res.end(JSON.stringify(result));
  }
};
