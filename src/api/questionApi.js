import axios from "axios";
import Cookies from "js-cookie";

export async function getQuestions() {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/questions",
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getQuestionsByUser() {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/questionByUser",
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

export async function getQuestionById(id) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/question/${id}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getQuestionByUser(uuid) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/questionByUser/${uuid}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getQuestionsByTopic(uuid) {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/questionsByTopic/${uuid}`,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getQuestionsByForum(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/questionsByForum/${uuid}`,
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

export async function createQuestion(data) {
  const token = Cookies.get("jwt");
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/question`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createQuestionsByForum(uuid, data) {
  const token = Cookies.get("jwt");
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:3000/questionsByForum/${uuid}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateQuestion(id, data) {
  const token = Cookies.get("jwt");
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:3000/question/${id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteQuestion(uuid) {
  const token = Cookies.get("jwt");

  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3000/question/${uuid}`,
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
