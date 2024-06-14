import axios from "axios";
import Cookies from "js-cookie";

export async function getUserProfile() {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/profile/`,
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

export async function getUserByUsername(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/profile/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id, data) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:3000/setting/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
