import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_SELECT,
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_EDIT,
    EMPLOYEE_DELETE,
    EMPLOYEES_FETCH_SUCCESS,
} from './types';

export const employeeSelect = ({ uid, name, phone, shift }) => ({
    type: EMPLOYEE_SELECT,
    payload: {
        uid,
        name,
        phone,
        shift,
    }
});

export const employeeUpdate = ({ prop, value }) => ({
    type: EMPLOYEE_UPDATE,
    payload: {
        prop,
        value,
    },
});

export const employeeCreate = (payload) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .push(payload)
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.pop();
            });
    };
};

export const employeeEdit = ({ uid, name, phone, shift }) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({ type: EMPLOYEE_EDIT });
                Actions.pop();
            });
    };
};

export const employeesFetch = () => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({
                    type: EMPLOYEES_FETCH_SUCCESS,
                    payload: snapshot.val(),
                });
            });
    };
};

export const employeeDelete = (uid) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                dispatch({ type: EMPLOYEE_DELETE });
                Actions.pop();
            });
    };
};
