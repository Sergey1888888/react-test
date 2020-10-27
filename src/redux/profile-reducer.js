import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 13 },
        { id: 2, message: "It's my first post!", likesCount: 15 }
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newId = state.posts.length + 1;
            let newPost = {
                id: newId,
                message: action.newText,
                likesCount: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}

export const addPost = (newText) => ({ type: ADD_POST, newText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos})

export const getProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updatePhoto = (photoFile) => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photoFile);
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
    else {
        console.log("Error " + response.messages[0]);
    }
}

export const setProfileData = (profile) => async (dispatch, getState) => {
    let response = await profileAPI.setProfileData(profile);
    if (response.resultCode === 0) {
        dispatch(getProfile(getState().auth.userId));
        return true;
    }
    else {
        const regex = /->([A-Za-z]+)/g;
        let errorAt = regex.exec(response.messages[0])[1].toLowerCase();
        dispatch(stopSubmit("editProfile", {contacts: {[errorAt]: response.messages[0]}}));
        return false;
    }
}

export default profileReducer;