import axios from "./axios";

export default {
    getCategory(params) {
        return axios.get("/category/all", { params });
    },
    addCategory(params) {
        return axios.get("/category/add", params)
    },
    editCategory(params) {
        return axios.put("/category/edit", params)
    },
    removeCategory(id) {
        return Axios.delete(`/categorys/${id}`)
    }
}