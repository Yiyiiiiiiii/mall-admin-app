import Cookies from "js-cookie";

/**
 * 用于设置用户信息
 * @param {Object} info
 * @returns
 */
export function setUserCookie(info) {
    // Cookies.set("appkey",info.appkey);
    // Cookies.set("username",info.username);
    // Cookies.set("email",info.email);
    // Cookies.set("role",info.role);

    // 循环写法
    const arr = Object.entries(info);
    for (let i = 0; i < arr.length; i += 1) {
        Cookies.set(arr[i][0], arr[i][1]);
    }
    return true;
}
/**
 * 用于获取用户信息
 */

export function getUserCookie() {
    return {
        appkey: Cookies.get("appkey"),
        username: Cookies.get("username"),
        email: Cookies.get("email"),
        role: Cookies.get("role"),
    };
}

/**
 * 删除Cookie
 */
export function removeUserCookie() {
    Cookies.remove("appkey"),
        Cookies.remove("username"),
        Cookies.remove("email"),
        Cookies.remove("role");
    return true;
}
