import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "61721783-f15a-4ad7-acb6-6f6e24b792d6"
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data);
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    getLogin() {
        return instance.get('https://social-network.samuraijs.com/api/1.0/auth/me').then(response => response.data);
    },
    getProfile(userId) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId ? userId : 2}`);
    }
}