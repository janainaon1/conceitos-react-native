import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3334",
  baseURL: "http://192.168.0.110:3334",
});

export default api;
