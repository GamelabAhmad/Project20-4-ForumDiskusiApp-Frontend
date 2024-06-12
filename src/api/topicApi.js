import axios from "axios";
import Cookies from "js-cookie";

export async function getTopics() {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/topics`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicById(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/topic/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createTopic(data) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/topic`,
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

export async function updateTopic(id, data) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:3000/topic/${id}`,
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

export async function deleteTopic(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3000/topic/${uuid}`,
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
