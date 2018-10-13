import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
} from './types';

const FIREBASE_ERROR_CODE_USER_NOT_FOUND = '';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    };
};

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER,
        });
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((loginError) => {
                console.log(loginError);
                switch (loginError.code) {
                    case FIREBASE_ERROR_CODE_USER_NOT_FOUND:
                        firebase.auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(user => loginUserSuccess(dispatch, user))
                            .catch((signUpError) => {
                                console.log(signUpError);
                                loginUserFailed(dispatch, signUpError);
                            });
                        return;
                    default:
                        loginUserFailed(dispatch, loginError);
                        return;
                }
            });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.main();
};

const loginUserFailed = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAILED,
        payload: error.message,
    });
};
