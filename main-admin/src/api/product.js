import Axios from "./axios";

export default {
    getProductAll(params) {
        return Axios.get("/products/all", { params })
    },
    addProduct(params) {
        return Axios.post("/products/add", params)
    },
    editPorduct(params) {
        return Axios.put("/products/edit", params)
    },
    getProductDetail(id) {
        return Axios.get(`/products/${id}`)
    },
    removeProduct(params) {
        return Axios.delete(`/products/${params.id}`)
    }

}