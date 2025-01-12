import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosinstance;
