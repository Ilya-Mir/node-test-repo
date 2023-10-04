import {addUser, deleteUser, getUser, updateUser} from '../services/usersService.js';

export const createUserHandler = (newUser, res) => {
  addUser(global.users, newUser);
  res.statusCode = 201;
  res.end('Successfully created user');
};
export const deleteUserHandler = (id, res) => {
  const result = deleteUser(global.users, id);
  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.end("Successfully remove");
  }
  return result;
}

export const updateUserHandler = (body, res) => {
  const result = updateUser(global.users, body);
  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.end("Successfully updated");
  }
}

export const getUserById = (id, res) => {
  const result = getUser(global.users, id);
  if (!result) {
    res.statusCode = 404;
    res.end('Not Found');
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify(result));
  }
}
