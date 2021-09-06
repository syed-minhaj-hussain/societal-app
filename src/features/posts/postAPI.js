import axios from "axios";
const authToken = JSON.parse(localStorage.getItem("token"));
export async function getPosts(auth) {
  return await axios.get(`http://localhost:5000/timeline`, {
    headers: { authorization: auth },
  });
}
export async function likePost(auth, postId) {
  return await axios.put(`http://localhost:5000/post/${postId}/like`, {
    headers: { authorization: authToken },
  });
}
