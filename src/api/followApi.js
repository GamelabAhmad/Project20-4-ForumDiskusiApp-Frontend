import axios from "axios";
import Cookies from "js-cookie";

export async function getFollowers(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/followers/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFollowing(uuid) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/following/${uuid}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function followUser(id) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/follow/${id}`,
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
