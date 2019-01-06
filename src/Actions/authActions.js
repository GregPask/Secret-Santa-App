export const loginUser = () => {
    console.log("func called");
    return {
        type: "LOGIN_USER"
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}