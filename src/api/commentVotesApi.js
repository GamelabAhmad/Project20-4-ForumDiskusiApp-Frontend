import axios from "axios";
import Cookies from "js-cookie";

export async function getCommentVotes(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/likes/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function upVoteComment(id) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/like/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function downVoteComment(id) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/unlike/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
