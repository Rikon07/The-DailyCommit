import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-daily-commit-server.vercel.app", 
  withCredentials: true,
});

export default instance;
