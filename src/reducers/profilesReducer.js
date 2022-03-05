const initialState = {
    profiles: []
}


export const profilesState = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_PROFILES': 
            return {
                ...state,
                profiles: action.profiles
            }
        default:
            return {
                ...state
            }
    }
}
