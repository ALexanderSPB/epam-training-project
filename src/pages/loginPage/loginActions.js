import Firebase, { errorCodes } from '../../common/helpers/firebase';
import { browserHistory } from 'react-router';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_ERROR_TYPES = {
    email: 'email',
    password: 'password'
};

const loginSuccess = userData => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

const loginError = (error, field) => ({
    type: LOGIN_ERROR,
    payload: {
        field: field,
        error: error
    }
});

export const loginAttempt = (email, password) => dispatch => {

    if (!email || !email.trim()) {
        dispatch(loginError('please, enter valid email', LOGIN_ERROR_TYPES.email));
    }
    if (!password || !password.trim()) {
        dispatch(loginError('password is required', LOGIN_ERROR_TYPES.password));
    }
    else
        Firebase.signIn(email, password)
            .then(userData => {
                browserHistory.push('/');
                dispatch(loginSuccess(userData));
            })
            .catch(error => {
                if (error.code === errorCodes.auth.wrongPassword) {
                    dispatch(loginError(error.message, LOGIN_ERROR_TYPES.password));
                }
                else {
                    dispatch(loginError(error.message, LOGIN_ERROR_TYPES.email));
                }
            });
};