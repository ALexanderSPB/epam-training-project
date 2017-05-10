import * as actionTypes from './loginActions';

class LoginData {
    constructor({ name, uid, role }) {
        this.name = name;
        this.uuid = uid;
        this.role = role;
    }
}

const initialState = {};

export default function loginData(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                user: new LoginData(payload)
            };

        case actionTypes.LOGIN_ERROR:
            return {
                error: {
                    ...state.error,
                    [payload.field]: payload.error
                }
            };

        default:
            return state;
    }
}
