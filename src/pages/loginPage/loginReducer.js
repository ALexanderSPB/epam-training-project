import * as actionTypes from './loginActions';
class LoginData {
    constructor({name, uid, role, institution}) {
        this.name = name;
        this.uuid = uid;
        this.role = role;
        this.institution = institution;
    }
}

const initialState = {};

export default function loginData(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case actionTypes.LOG_OUT:
            return initialState;

        case actionTypes.LOGIN_SUCCESS:
            return new LoginData(payload);

        case actionTypes.LOGIN_ERROR:
            return {
                error: {
                    ...state.error,
                    [payload.field]: payload.error
                }
            };

        case actionTypes.CLEAR_ERROR:
            return {
                error: {
                    ...state.error,
                    [payload.field]: ''
                }
            };

        default:
            return state;
    }
}
