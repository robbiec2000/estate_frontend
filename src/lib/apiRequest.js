import axios from "axios";

const isLocal = true;
export const SERVER_URL = isLocal?"http://localhost:8800":"http://52.62.36.163:8800";

//import.meta.env.VITE_SERVER_URL
const apiRequest = axios.create({
    baseURL:SERVER_URL + "/api",
    withCredentials: true,
});

export default apiRequest;