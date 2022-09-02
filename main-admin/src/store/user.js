import { getUserCookie, setUserCookie, removeUserCookie } from "../utils/UserCookie";

export default {
    namespaced: true,
    state: {
        user: getUserCookie()

    },
    mutations: {
        setUser(state, userInfo) {
            state.user = userInfo;
        },
        exits(state) {
            state.user = {
                username: "",
                appkey: "",
                role: "",
                email: "",
            }
        }
    },
    actions: {
        fetchUser({ commit }, userInfo) {
            commit("setUser", userInfo)
            setUserCookie(userInfo);
        },
        fetchUserRemove({ commit }) {
            commit("exits")
            removeUserCookie();
        }
    }
}