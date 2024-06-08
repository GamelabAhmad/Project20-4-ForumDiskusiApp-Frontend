import axios from "axios";

export async function getForum() {
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
