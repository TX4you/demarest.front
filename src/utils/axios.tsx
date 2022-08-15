import axios from "axios";

const defaultOptions = {
  baseURL: "https://localhost:5001",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};
let instance = axios.create(defaultOptions);

export default instance;

