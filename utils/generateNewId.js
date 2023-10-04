export const generateNewId = (USERS) => {
  return Math.max(...USERS.map(USER => USER.id)) + 1;
};
