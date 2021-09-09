import axios from "axios";
const authToken = JSON.parse(localStorage.getItem("token")) || null;
console.log({ authToken });
export async function getPosts(authToken) {
  return await axios.get(`https://societal.herokuapp.com/timeline`, {
    headers: { authorization: authToken },
  });
}
export async function likePost(auth, postId) {
  // console.log(postId);
  // console.log(authToken);
  return await axios.post(
    `https://societal.herokuapp.com/post/${postId}/like`,
    { id: postId },
    {
      headers: { authorization: authToken },
    }
  );
}
