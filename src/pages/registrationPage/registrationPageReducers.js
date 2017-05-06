import {
    REGISTRATION_SUBMIT,
    REGISTRATION_GET_LOCATIONS,
    REGISTRATION_LOCATIONS_REQUEST,
    REGISTRATION_SUBMIT_REQUEST
} from './registrationPageActionTypes';
export default function registrationSubmit(state = { isLoading: true }, action) {
    switch (action.type) {
        case REGISTRATION_SUBMIT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REGISTRATION_SUBMIT:
            return {
                ...state,
                isLoading: false,
                usersName: action.value.name,
                userId: action.value.uuid,
                role: action.value.role,
                location: action.value.location
            };
        case REGISTRATION_GET_LOCATIONS:
            return {
                ...state,
                locations: action.value,
                isLoading: false
            }
        case REGISTRATION_LOCATIONS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        default: return state;
    }
}
