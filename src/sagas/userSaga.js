import { call, takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";



import UserActionTypes from '../actions/types';
import {
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    signUpSuccess,
    signUpFailure,
} from '../actions/authActions';


//sign up

export function* signUpAsync({ payload: { name, email, password, repassword, history } }) {
    try {
        const response = yield axios({
            method: 'post',
            url: '/api/users/register',
            data: {
                name,
                email,
                password,
                repassword
            }
        });
        yield put(signUpSuccess(response.data.user));
        history.push('/login');   // re-direct to login on successful register

    } catch (error) {
        yield put(signUpFailure(error.response.data));
    }
}

//login 

export function* emailSignInAsync({ payload: { email, password, history } }) {


    try {
        const response = yield axios({
            method: 'post',
            url: '/api/users/login',
            data: {
                email,
                password
            }
        });
        // Save to localStorage
        // Set token to localStorage
        const { token } = response.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        yield put(signInSuccess(decoded));
        history.push('/dashboard');   // re-direct to dashboard on successful login
    } catch (error) {
        console.log(error, "error");
        yield put(signInFailure(error.response.data));
    }
}

//logout

//sign out
export function* signOutAsync({ payload: { history } }) {
    try {
        const response = yield axios.get("/api/logout/logout");

        var str = JSON.stringify(response)
        console.log(str + "logout action")

        // Remove token from local storage
        localStorage.removeItem("jwtToken");
        // Remove auth header for future requests
        setAuthToken(false);

        // Set current user to empty object {} which will set isAuthenticated to false
        yield put(signOutSuccess({}));
        // window.location.href = "./";
        history.push('/');
    } catch (error) {
        yield put(signOutFailure(error));
    }
}


//---------------------------------watcher----------------------------------

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUpAsync);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutAsync);
}



export function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignOutStart),
    ]);
}