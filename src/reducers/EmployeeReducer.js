import {
    EMPLOYEES_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    data: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEES_FETCH_SUCCESS:
            return {
                ...state,
                data: { ...action.payload },
            };
        default:
            return state;
    }
};
