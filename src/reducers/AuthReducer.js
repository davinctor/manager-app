import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    user: null,
    error: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.payload,
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                password: '',
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
