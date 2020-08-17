import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_OK,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_OK,
    LOGOUT_OK,
    AUTH_ERROR
} from "./types";

const initialState = {
    token: localStorage.getItem("token"),
    isloading: false,
    isAuth: null,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state, isLoading: true
            };
        case USER_LOADED:
            return {
                ...state, isLoading: false, isAuth: true, user: action.payload
            };
        case LOGIN_OK:
        case REGISTER_OK:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, ...action.payload, isLoading: false, isAuth: true, user: action.payload
            };
        case AUTH_ERROR:
        case LOGOUT_OK:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state, token: null, isLoading: false, isAuth: false, user: null
            };
        default:
            return state
    }
}