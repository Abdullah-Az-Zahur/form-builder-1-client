import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://form-builder-1-server.vercel.app/",
  withCredentials: true,
});


export default axiosPublic;
