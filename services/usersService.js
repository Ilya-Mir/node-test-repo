import {generateNewId} from '../utils/generateNewId.js';

const USERS = [
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

export const addUser = (newUserData) => {
  const newUserWithId = {
    ...newUserData,
    id: generateNewId(USERS)
  }

  USERS.push(newUserWithId);
}

export const deleteUser = (id) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === id);
  if (indexOfUser !== -1) {
    USERS.splice(indexOfUser, 1);
    return true
  } else {
    return false
  }
}

export const getUser = (id) => {
  return USERS.find(USER => USER.id.toString() === id.toString())
}

export const updateUser = (newUserData) => {
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
