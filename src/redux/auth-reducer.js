import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_IS_FETCHING_LOGIN = "TOGGLE_IS_FETCHING_LOGIN";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";
const SET_DEFAULT_CAPTCHA = "SET_DEFAULT_CAPTCHA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return { ...state, ...action.payload }
        }
        case TOGGLE_IS_FETCHING_LOGIN: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_CAPTCHA_URL: {
            return {...state, captchaUrl: action.url}
        }
        case SET_DEFAULT_CAPTCHA: {
            return {...state, captchaUrl: null}
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING_LOGIN, isFetching})
export const setCaptchaUrl = (url) => ({ type: SET_CAPTCHA_URL, url });
export const setDefaultCaptcha = () => ({ type: SET_DEFAULT_CAPTCHA });

export const getLogin = () => (dispatch) => {
    dispatch(setIsFetching(true));
    return authAPI.getLogin().then((data) => {
        dispatch(setIsFetching(false));
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    });
}

export const Login = (email, password, rememberMe, captcha = null) => (dispatch, getState) => {
    authAPI.Login(email, password, rememberMe, captcha).then(response => {
        if (response.resultCode === 0) {
            dispatch(getLogin());
            dispatch(setDefaultCaptcha());
        }
        else {
            if (response.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.messages.length > 0 ? response.messages[0] : "Error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    })
}

export const Logout = () => (dispatch) => {
    authAPI.Logout().then(response => {
        if (response.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    })
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await authAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(response.url));
}

export default authReducer;