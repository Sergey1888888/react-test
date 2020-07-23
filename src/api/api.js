import * as axios from "axios";
import Login from "../components/Login/Login";

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
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId ? userId : 9051}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId ? userId : 9051}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status });
    }
}

export const authAPI = {
    getLogin() {
        return instance.get('auth/me').then(response => response.data);
    },
    Login(email, password, rememberMe = false) {
        return instance.post('auth/login', { email, password, rememberMe }).then(response => response.data);
    },
    Logout() {
        return instance.delete('auth/login').then(response => response.data);
    }
}