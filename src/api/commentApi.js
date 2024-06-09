import axios from "axios";

export async function getCommentsByPostId(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/comments/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
