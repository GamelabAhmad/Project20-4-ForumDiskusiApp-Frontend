import axios from "axios";
import Cookies from "js-cookie";

export async function getFollowersUser(uuid) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/followers/${uuid}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFollowingUser(uuid) {
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

export async function unfollowUser(id) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3000/unfollow/${id}`,
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

export async function isUserFollowed(id) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/isFollowed/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.isFollowed;
  } catch (error) {
    throw error;
  }
}
