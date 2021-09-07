import axios from "axios";
// axios.defaults.timeout = 36000000;
const authToken = JSON.parse(localStorage.getItem("token"));
export async function getPosts(auth) {
  return await axios.get(`http://localhost:5000/timeline`, {
    headers: { authorization: auth },
  });
}
export async function likePost(auth, postId) {
  console.log(postId);
  console.log(authToken);
  return await axios.get(`http://localhost:5000/post/${postId}/`, {
    headers: { authorization: authToken },
  });
}
