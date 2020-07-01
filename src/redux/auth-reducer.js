const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return { ...state, ...action.data, isAuth: true }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_AUTH_USER_DATA, data: {userId, email, login}})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export default authReducer;