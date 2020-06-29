import { act } from "react-dom/test-utils";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_MIN_MAX_PAGES = "SET_MIN_MAX_PAGES";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    minPage: 1,
    maxPage: 5,
    isFetching: false
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
        default:
            return state;
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCountAC = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const setMinMaxPagesAC = (min, max) => ({ type: SET_MIN_MAX_PAGES, minPage: min, maxPage: max })
export const setIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export default usersReducer;