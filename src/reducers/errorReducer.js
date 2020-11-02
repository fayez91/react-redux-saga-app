import UserActionTypes from './../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return action.payload;
        default:
            return state;
    }
}