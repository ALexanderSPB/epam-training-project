import {TEACHERS} from '../../constants/fetchActionsTypes';

const ROLE_TEACHER = 2;
const initialState = [];

export default function teachers(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case TEACHERS.RECEIVE: {
            const teachers = [];
            Object.keys(payload).forEach(key => {
                const user = payload[key];
                if (user.role === ROLE_TEACHER) {
                    teachers.push({...user, ...{uuid: key, password: ''}});
                }
            });
            return teachers;
        }

        case TEACHERS.REJECT:
            // eslint-disable-next-line
            console.error(`Teachers can't be loaded due to: ${payload}`);
            return state;

        default:
            return state;
    }
}
