import axios from "axios";
import Cookies from "js-cookie";

export async function getForums() {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/forums",
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getForumById(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/forum/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createForum(data) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/forum`,
      data: data,
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

export async function updateForum(id, data) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:3000/forum/${id}`,
      data: data,
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

export async function deleteForum(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3000/forum/${uuid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
