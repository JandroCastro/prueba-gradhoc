import { User } from './usersTypes';

export const adaptUser = (raw: any): User => ({
  id: raw.login.uuid,
  name: `${raw.name.first} ${raw.name.last}`,
  email: raw.email,
  phone: raw.phone,
  country: raw.location.country,
  age: raw.dob.age,
  picture: raw.picture.thumbnail,
});

export const adaptUsers = (rawArray: any[]) => {
  const allUsersById: Record<string, User> = {};
  const allUsersList: string[] = [];

  rawArray.forEach((rawUser) => {
    const user = adaptUser(rawUser);
    allUsersById[user.id] = user;
    allUsersList.push(user.id);
  });

  return { allUsersById, allUsersList };
};
