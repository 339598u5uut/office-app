import {
    GET_AUTHORIZATION_REQUEST,
    GET_AUTHORIZATION_SUCCESS,
    GET_AUTHORIZATION_ERROR,
    GET_LOGOUT_REQUEST,
    GET_LOGOUT_SUCCESS,
    GET_LOGOUT_ERROR
}
    from "../actions";
import { TUserActions } from "../actions/user";

export type TUserState = {
    user: {
        username: string,
        password: number | string,
    },
    isAuthenticated: boolean;
    loginSuccess: boolean;
    loginRequest: boolean;
    loginError: boolean;
    logoutSuccess: boolean;
    logoutRequest: boolean;
    logoutError: boolean;
}

export const initialState: TUserState = {
    user: {
        username: '',
        password: '',
    },
    isAuthenticated: false,

    loginSuccess: false,
    loginRequest: false,
    loginError: false,

    logoutSuccess: false,
    logoutRequest: false,
    logoutError: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case GET_AUTHORIZATION_REQUEST:
            {
                return {
                    ...state,
                    loginRequest: true,
                };
            }
        case GET_AUTHORIZATION_SUCCESS:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        username: action.username,
                        password: action.password,
                    },
                    isAuthenticated: true,
                    loginSuccess: true,
                };
            }
        case GET_AUTHORIZATION_ERROR:
            {
                return {
                    ...state,
                    loginError: true,
                };
            }
        case GET_LOGOUT_REQUEST:
            {
                return {
                    ...state,
                    logoutRequest: true,
                    isAuthenticated: false,
                };
            }
        case GET_LOGOUT_SUCCESS:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        username: action.username,
                        password: action.password,
                    },
                    loginSuccess: false,
                    loginRequest: false,
                    logoutSuccess: true,
                    isAuthenticated: false,
                };
            }
        case GET_LOGOUT_ERROR:
            {
                return {
                    ...state,
                    logoutError: true,
                };
            }
        default:
            return state
    }
}