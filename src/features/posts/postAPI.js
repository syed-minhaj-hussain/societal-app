import axios from "axios";
const authToken = JSON.parse(localStorage.getItem("token")) || null;
export async function getPosts(auth) {
  return await axios.get(`https://societal.herokuapp.com/timeline`, {
    headers: { authorization: auth },
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
