import axios from "axios";

export async function getUserByUsername(username) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/${username}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
