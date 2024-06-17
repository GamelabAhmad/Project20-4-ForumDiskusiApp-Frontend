import axios from "axios";
import Cookies from "js-cookie";

export async function joinForum(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/member/${uuid}`,
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

export async function leaveForum(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3000/member/${uuid}`,
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

export async function userMemberForum(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/membership/${uuid}`,
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
