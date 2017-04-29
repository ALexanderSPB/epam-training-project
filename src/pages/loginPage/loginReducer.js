import * as actionTypes from './loginActions';

class LoginData {
    constructor(name, uuid) {
        this.name = name;
        this.uuid = uuid;
    }
}

const initialState = [];

export default function loginData(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                user: new LoginData(payload.name, payload.uid)
            };

        case actionTypes.LOGIN_ERROR_EMAIL:
            return {
                error: {
                    ...state.error,
                    email: `Mistake in email: ${payload}`
                }
            };

        case actionTypes.LOGIN_ERROR_PASSWORD:
            return {
                error: {
                    ...state.error,
                    password: `Mistake in password: ${payload}`
                }
            };

        default:
            return state;
    }
}