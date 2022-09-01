import axios from "./axios";

export default {
    postLogin(params) {
        return axios.post("/passport/login", params);
    }
}