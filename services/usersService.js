import {generateNewId} from '../utils/generateNewId.js';

export const addUser = (USERS, newUserData) => {
  const newUserWithId = {
    ...newUserData,
    id: generateNewId(USERS)
  }

  USERS.push(newUserWithId);
}

export const deleteUser = (USERS, id) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === id);
  if (indexOfUser !== -1) {
    USERS.splice(indexOfUser, 1);
    return true
  } else {
    return false
  }
}

export const getUser = (USERS, id) => {
  return USERS.find(USER => USER.id.toString() === id.toString())
}

export const updateUser = (USERS, newUserData) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === newUserData.id.toString());
  if (indexOfUser !== -1) {
    USERS[indexOfUser] = {
      ...USERS[indexOfUser],
      ...newUserData
    }
    return true
  } else {
    return false
  }
}
