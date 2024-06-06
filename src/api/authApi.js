import axios from "axios";

export async function signIn(username, password) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/signin",
      headers: { "Content-Type": "application/json" },
      data: {
        username,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signUp(username, email, password) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/signup",
      headers: { "Content-Type": "application/json" },
      data: {
        username,
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
