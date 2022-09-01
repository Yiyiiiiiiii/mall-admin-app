export default {
    login(params) {
        return this.axios.get("/user")
    }
}