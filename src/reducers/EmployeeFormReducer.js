import {
    EMPLOYEE_SELECT,
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_EDIT,
    EMPLOYEE_DELETE,
} from '../actions/types';

const INITIAL_STATE = {
    uid: null,
    name: '',
    phone: '',
    shift: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case EMPLOYEE_SELECT:
            return {
                ...state,
                ...payload,
            };
        case EMPLOYEE_UPDATE:
            return {
                ...state,
                [payload.prop]: payload.value,
            };
        case EMPLOYEE_CREATE:
        case EMPLOYEE_EDIT:
        case EMPLOYEE_DELETE:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};
