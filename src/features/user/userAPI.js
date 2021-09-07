import axios from "axios";
// axios.defaults.timeout = 36000000;
export async function getUser(auth, id) {
  return await axios.get(`http://localhost:5000/users/${id}`, {
    headers: { authorization: auth },
  });
}
