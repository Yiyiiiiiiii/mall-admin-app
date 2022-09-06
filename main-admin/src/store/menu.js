// 存储菜单的路由
export default {
    namespaced: true,
    state: {
        menuRoutes: []
    },
    mutations: {
        setMenuRoutes(state, payload) {
            state.menuRoutes = payload;
        }
    },
    actions: {
        fetchMenuRoutes({ commit }, routes) {
            commit("setMenuRoutes", routes);
        }
    }
}