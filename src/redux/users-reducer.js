const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
    users: [
        // {id: 1, photoUrl: 'https://i.redd.it/tyhrngisvqv31.png', followed: false, fullName: 'Sergey', status: 'Я бог', location: {city: 'Moscow', country: 'Russia'}},
        // {id: 2, photoUrl: 'https://i.ytimg.com/vi/gRm57CMI28Y/hqdefault_live.jpg', followed: true, fullName: 'Dmitry', status: 'Я бог', location: {city: 'Volgograd', country: 'Russia'}},
        // {id: 3, photoUrl: 'https://images.prismic.io/rivalryglhf/67c465de-fbc1-4123-b25e-cc54dbaa2092_kekwait.png?auto=compress,format&rect=0,32,128,64&w=720&h=360', followed: false, fullName: 'Vitya', status: 'Я бог', location: {city: 'Harkiv', country: 'Ukraine'}},
        // {id: 4, photoUrl: 'https://i.redd.it/qm3ksi2yajq41.png', followed: false, fullName: 'Maks', status: 'Я бог', location: {city: 'Minsk', country: 'Belarus'}}
    ]
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
            return { ...state, users: [ ...state.users, ...action.users ] }
            }
        default:
            return state;
    }
}

export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })

export default usersReducer;