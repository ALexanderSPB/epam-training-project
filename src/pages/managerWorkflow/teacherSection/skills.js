import {SKILLS} from '../../../constants/fetchActionsTypes';

const initialState = [];
export default function skills(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case SKILLS.RECEIVE: {
            return payload;
        }

        case SKILLS.REJECT: {
            // eslint-disable-next-line
            console.error(`Skills can't be loaded due to: ${payload}`);
            return state;
        }

        default:
            return state;
    }
}
