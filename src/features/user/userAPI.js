import axios from "axios";
// axios.defaults.timeout = 36000000;
export async function getUser(auth, id) {
  return await axios.get(`http://localhost:5000/users/${id}`, {
    headers: { authorization: auth },
  });
}
export async function follow(auth, profileId, userId) {
  return await axios.post(
    `http://localhost:5000/users/${profileId}/follow`,
    { id: userId },
    {
      headers: { authorization: auth },
    }
  );
}
export async function unFollow(auth, profileId, userId) {
  return await axios.post(
    `http://localhost:5000/users/${profileId}/unfollow`,
    { id: userId },
    {
      headers: { authorization: auth },
    }
  );
}
export async function searchUserApi(auth, name) {
  return await axios.get(`http://localhost:5000/users/search/${name}`, {
    headers: { authorization: auth },
  });
}
