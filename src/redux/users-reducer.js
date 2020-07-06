import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_MIN_MAX_PAGES = "SET_MIN_MAX_PAGES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    minPage: 1,
    maxPage: 5,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return { 
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                } )
            }
        case UNFOLLOW:
            return { 
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                } )
            }
        case SET_USERS: {
            return { ...state, users: [ ...action.users ] }
            }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
            }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalCount: action.totalCount }
        }
        case SET_MIN_MAX_PAGES: {
            return { ...state, minPage: action.minPage, maxPage: action.maxPage }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const setMinMaxPages = (min, max) => ({ type: SET_MIN_MAX_PAGES, minPage: min, maxPage: max })
export const setIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const setIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize, minPage = null, maxPage = null, pagesCount = null) => {
    return (dispatch) => {
            dispatch(setIsFetching(true));
            usersAPI.getUsers(currentPage, pageSize).then((data) => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
            if (minPage != null && maxPage != null && pagesCount != null) {
                dispatch(setCurrentPage(currentPage));
                if (currentPage === maxPage && (maxPage != pagesCount)) {
                    dispatch(setMinMaxPages(minPage+1, maxPage+1));
                }
                else if (currentPage === minPage && (minPage != 1)) {
                    dispatch(setMinMaxPages(minPage-1, maxPage-1));
                }
            }
    }
} 
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.followUser(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(setIsFollowingProgress(false, userId));
        })
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setIsFollowingProgress(true, userId));
        usersAPI.unfollowUser(userId).then((data) => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(setIsFollowingProgress(false, userId));
        })
    }
}

export default usersReducer;