export default {
    namespaced: true,
    state: {
        user: {
            appkey: '',
            username: '',
            email: '',
            role: ''
        }

    },
    mutations: {
        setUser(state, userInfo) {
            state.user = userInfo;
        }

    },
    actions: {
        fetchUser({ commit }, userInfo) {
            console.log('aaa');
            commit("setUser", userInfo)
        }

    }
}