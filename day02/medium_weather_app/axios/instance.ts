import axios from "axios"


export const instanceApi = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json", },
});