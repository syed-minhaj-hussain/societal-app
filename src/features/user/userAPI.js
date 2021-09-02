import axios from "axios";
export async function getUser(auth, id) {
  return await axios.get(`http://localhost:5000/users/${id}`, {
    headers: { authorization: auth },
  });
}
