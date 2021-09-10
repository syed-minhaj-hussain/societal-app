import axios from "axios";
export async function getUser(auth, id) {
  console.log("getUser::", { auth });
  return await axios.get(`https://societal.herokuapp.com/users/${id}`, {
    headers: { authorization: auth },
  });
}
export async function follow(auth, profileId, userId) {
  return await axios.post(
    `https://societal.herokuapp.com/users/${profileId}/follow`,
    { id: userId },
    {
      headers: { authorization: auth },
    }
  );
}
export async function unFollow(auth, profileId, userId) {
  return await axios.post(
    `https://societal.herokuapp.com/users/${profileId}/unfollow`,
    { id: userId },
    {
      headers: { authorization: auth },
    }
  );
}
export async function searchUserApi(auth, name) {
  return await axios.get(
    `https://societal.herokuapp.com/users/search/${name}`,
    {
      headers: { authorization: auth },
    }
  );
}
