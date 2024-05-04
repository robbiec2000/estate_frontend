import axios from "axios";

const apiRequest = axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL + "/api",
    withCredentials: true,
});

export default apiRequest;