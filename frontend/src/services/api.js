import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    response?.data?.result && console.log(`Result: ${response?.data?.result}`);
    
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API methods
export const getChoices = async () => {
  try {
    const response = await api.get("/choices");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch choices", error);
  }
};

export const getRandomChoice = async () => {
  try {
    const response = await api.get("/choice");
    return response.data;
  } catch (error) {
    throw new Error("Failed to get random choice", error);
  }
};

export const playRound = async (choice_id) => {
  try {
    const response = await api.post("/play", { player: choice_id });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || "Invalid choice");
    }
    throw new Error("Failed to play round");
  }
};

export const getGameHistory = async () => {
  try {
    const response = await api.get("/history");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game history", error);
  }
};

export const clearGameHistory = async () => {
  try {
    const response = await api.delete("/history");
    return response.data;
  } catch (error) {
    throw new Error("Failed to clear game history", error);
  }
};

export const getGameStats = async () => {
  try {
    const response = await api.get("/stats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game statistics", error);
  }
};
