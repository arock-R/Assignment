const initialState = {
    user: null,
    token: ''
}


export const userState = (state=initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER': 
            return {
                ...state,
                token: action.token
            }
            case 'FETCH_USER': 
            return {
                ...state,
                user: action.user
            }
            case 'LOGOUT_USER': 
            return {
                ...state,
                token: action.token
            }
        default:
            return {
                ...state
            }
    }
}
