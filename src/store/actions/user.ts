import {
    GET_AUTHORIZATION_REQUEST,
    GET_AUTHORIZATION_SUCCESS,
    GET_AUTHORIZATION_ERROR,

    GET_LOGOUT_REQUEST,
    GET_LOGOUT_SUCCESS,
    GET_LOGOUT_ERROR,
} from ".";
import checkResponse from ".";
import { AppThunk, AppDispatch } from "../reducers/root-reducer";

//LOGIN
export type TUser = {
    readonly username: string;
    readonly password: string | number;
}

export type TgetLoginReq = {
    readonly type: typeof GET_AUTHORIZATION_REQUEST;
}

export type TgetLoginSucc = {
    readonly type: typeof GET_AUTHORIZATION_SUCCESS;
    readonly username: string;
    readonly password: number;
}
export type TgetLoginError = {
    readonly type: typeof GET_AUTHORIZATION_ERROR;
}

export function getLoginReq(): TgetLoginReq {
    return {
        type: GET_AUTHORIZATION_REQUEST
    }
}

export function getLoginSucc(username: string, password: number): TgetLoginSucc {
    return {
        type: GET_AUTHORIZATION_SUCCESS,
        username,
        password
    }
}

export function getLoginError(): TgetLoginError {
    return {
        type: GET_AUTHORIZATION_ERROR
    }
}

export const getLoginRequest = () => {
    return fetch(`${'http://localhost:3000/user'}`)
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export const login: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getLoginReq());
    getLoginRequest()
        .then(res => {
            if (res) {
                dispatch(getLoginSucc(res.username, res.password));
            }
        }).catch(err => {
            dispatch(getLoginError());
        })
}

//LOGOUT
export type TgetLogoutReq = {
    readonly type: typeof GET_LOGOUT_REQUEST;
}

export type TgetLogoutSucc = {
    readonly type: typeof GET_LOGOUT_SUCCESS;
    readonly username: string;
    readonly password: number;
}

export type TgetLogoutError = {
    readonly type: typeof GET_LOGOUT_ERROR;
}

export function getLogoutReq(): TgetLogoutReq {
    return {
        type: GET_LOGOUT_REQUEST
    }
}

export function getLogoutSucc(username: string, password: number): TgetLogoutSucc {
    return {
        type: GET_LOGOUT_SUCCESS,
        username,
        password,
    }
}

export function getLogoutError(): TgetLogoutError {
    return {
        type: GET_LOGOUT_ERROR
    }
}

export const getLogoutRequest = (username: string, password: number) => {
    return fetch(`${'http://localhost:3000/user'}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })

    })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

//thunk
export const logout: AppThunk = (username: string, password: number) => (dispatch: AppDispatch) => {
    dispatch(getLogoutReq());
    getLogoutRequest(username, password)
        .then(res => {
            if (res) {
                dispatch(getLogoutSucc(res.username, res.password));
            }
        }).catch(err => {
            dispatch(getLogoutError());
        })
}

export type TUserActions =
    TgetLoginReq | TgetLoginSucc | TgetLoginError | TgetLogoutReq | TgetLogoutSucc | TgetLogoutError;