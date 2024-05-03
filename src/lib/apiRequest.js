import axios from "axios";

const apiRequest = axios.create({
    baseURL:"http://52.62.36.163/8800/api",
    withCredentials: true,
});

export default apiRequest;