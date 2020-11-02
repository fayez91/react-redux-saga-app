import UserActionTypes from '../actions/types';

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
};


export default function (state = initialState, action) {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
            };
        default:
            return state;
    }
}