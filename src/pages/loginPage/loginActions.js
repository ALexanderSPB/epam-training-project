import Firebase, {errorCodes} from '../../common/helpers/firebase';
import {browserHistory} from 'react-router';
import {ROLE_MANAGER, ROLE_TEACHER} from '../../constants/roles';

export const LOG_OUT = 'LOG_OUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const LOGIN_ERROR_TYPES = {
    email: 'email',
    password: 'password'
};

export const logOut = () => ({type: LOG_OUT});

export const loginSuccess = userData => ({
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

const clearError = (field) => ({
    type: CLEAR_ERROR,
    payload: {
        field: field,
    }
});

export const loginAttempt = (email, password) => dispatch => {

    if (!email || !email.trim()) {
        dispatch(loginError('please, enter valid email', LOGIN_ERROR_TYPES.email));
    } else {
        dispatch(clearError(LOGIN_ERROR_TYPES.email));
    }

    if (!password || !password.trim()) {
        dispatch(loginError('password is required', LOGIN_ERROR_TYPES.password));
    } else {
        dispatch(clearError(LOGIN_ERROR_TYPES.password));
        Firebase.signIn(email, password)
            .then(userData => {
                dispatch(loginSuccess(userData));
                switch (userData.role) {
                    case ROLE_MANAGER: {
                        browserHistory.push('/manager/location');
                        break;
                    }
                    case ROLE_TEACHER: {
                        browserHistory.push('/teacher');
                        break;
                    }

                    default: {
                        browserHistory.push('/');
                        break;
                    }
                }
            })
            .catch(error => {
                if (error.code === errorCodes.auth.wrongPassword) {
                    dispatch(loginError(error.message, LOGIN_ERROR_TYPES.password));
                }
                else {
                    dispatch(loginError(error.message, LOGIN_ERROR_TYPES.email));
                }
            });
    }

};
