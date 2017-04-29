import Firebase, { errorCodes } from '../../common/helpers/firebase';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR_EMAIL = 'LOGIN_ERROR_EMAIL';
export const LOGIN_ERROR_PASSWORD = 'LOGIN_ERROR_PASSWORD';

const loginSuccess = userData => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

const loginErrorEmail = error => ({
    type: LOGIN_ERROR_EMAIL,
    payload: error
});

const loginErrorPassword = error => ({
    type: LOGIN_ERROR_PASSWORD,
    payload: error
});

export const loginAttempt = (email, password) => dispatch => {
    if (!email.trim()) {
        dispatch(loginErrorEmail('please, enter valid email'));
    }
    if (!password.trim()) {
        dispatch(loginErrorPassword('password is required'));
    }
    else
        return Firebase.signIn(email, password)
            .then(userData => {
                dispatch(loginSuccess(userData))})
            .catch(error => {
                if (error.code === errorCodes.auth.wrongPassword) {
                    dispatch(loginErrorPassword(error.message));
                }
                else {
                    dispatch(loginErrorEmail(error.message));
                }
            });
};