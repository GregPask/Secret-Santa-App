const initialState = {

    authenticated: false,
    one: "one"

}

export default function (state = initialState, action) {
    switch (action.type) {
        case "hello":
            return {
                state
            }

        case "LOGIN_USER":
            return {
                ...state,
                authenticated: true
            }


        case "LOGOUT_USER":
            return {
                ...state,
                authenticated: false
            }

        default:
            return state
    }
}


