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

        case actionTypes.LOGIN_ERROR:
            console.log(payload);
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