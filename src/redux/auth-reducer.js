import { authAPI } from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING_LOGIN = "TOGGLE_IS_FETCHING_LOGIN";

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
        case TOGGLE_IS_FETCHING_LOGIN: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_AUTH_USER_DATA, data: {userId, email, login}})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING_LOGIN, isFetching})

export const getLogin = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        authAPI.getLogin().then((data) => {
            dispatch(setIsFetching(false));
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
    }
}

export const Login = (email, password, rememberMe) => (dispatch) => {
    authAPI.Login(email, password, rememberMe).then(response => {
        if (response.resultCode === 0) {
            dispatch(getLogin());
        }
    })
}

export default authReducer;