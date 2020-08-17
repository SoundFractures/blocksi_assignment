import axios from 'axios';
import {
    getErrors
} from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_OK,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_OK,
    LOGOUT_OK,
    AUTH_ERROR,

} from "./types";

export const getUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });
    axios.get('/api/auth/user', configHelper(getState)).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(error => {
        dispatch(getErrors(error.response.data, error.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
};

export const register = ({
    username,
    password
}) => dispatch => {
    const header = {
        headers: {
            "Contect-type": "application/json",
        }
    }
    const body = {
        username: username,
        password: password,

    }
    axios.post('/api/auth/register', body, header).then(res => dispatch({
            type: REGISTER_OK,
            payload: res.data
        }))
        .catch(error => {
            dispatch(getErrors(error.response.data, error.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = ({
    username,
    password
}) => dispatch => {
    const header = {
        headers: {
            "Contect-type": "application/json",
        }
    }
    const body = {
        username: username,
        password: password,

    }
    axios.post('/api/auth/login', body, header).then(res => dispatch({
            type: LOGIN_OK,
            payload: res.data
        }))
        .catch(error => {
            dispatch(getErrors(error.response.data, error.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const logout = () => {
    return {
        type: LOGOUT_OK
    };
};

export const configHelper = getState => {
    const token = getState().auth.token;
    const header = {
        headers: {
            "Contect-type": "application/json",
        }
    }
    if (token) {
        header.headers['Authorization'] = "Bearer " + token;
    }
    return header;
};