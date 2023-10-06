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

export const addHobby = (id, hobby) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === id.toString());
  if (indexOfUser !== -1) {
    USERS[indexOfUser].hobbies.push(hobby);
    return true
  } else {
    return false
  }
}

export const removeHobby = (id, hobby) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === id);
  if (indexOfUser !== -1) {
    const indexOfHobby = USERS[indexOfUser].hobbies.find(hobbiesItem => hobbiesItem === hobby);
    indexOfHobby !== -1 && USERS[indexOfUser].hobbies.splice(indexOfHobby + 1, 1);
    return true
  } else {
    return false
  }
}

export const getHobbiesByUser = (id) => {
  const indexOfUser = USERS.findIndex(USER => USER.id.toString() === id);

  return indexOfUser !== -1 ? USERS[indexOfUser].hobbies : false;
}
