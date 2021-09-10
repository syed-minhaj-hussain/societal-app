import axios from "axios";
export async function getPosts(auth) {
  console.log("API", { auth });
  return await axios.get(`https://societal.herokuapp.com/timeline`, {
    headers: { authorization: auth },
  });
}
export async function likePost(auth, postId) {
  return await axios.post(
    `https://societal.herokuapp.com/post/${postId}/like`,
    { id: postId },
    {
      headers: { authorization: auth },
    }
  );
}
