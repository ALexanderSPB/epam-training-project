import * as actionTypes from './loginActions';
import * as headerActionTypes from '../../common/parts/header/headerAction';
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
        case headerActionTypes.LOG_OUT:
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

        default:
            return state;
    }
}
