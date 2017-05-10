import Firebase from '../../common/helpers/firebase';
import {loginSuccess} from '../loginPage/loginActions';
import {browserHistory} from 'react-router';
import {
    REGISTRATION_SUBMIT,
    REGISTRATION_SUBMIT_REQUEST,
    REGISTRATION_GET_LOCATIONS,
    REGISTRATION_LOCATIONS_REQUEST,
} from './registrationPageActionTypes';

export const registrationSubmit = (data) => {
    return (dispatch) => {
        dispatch({
            type: REGISTRATION_SUBMIT_REQUEST,
            value: ''
        });
        Firebase.signUp(data.email, data.password, data.name, data.location)
            .then(result => {
                alert('Registration success');
                browserHistory.push('/');
                dispatch({
                    type: REGISTRATION_SUBMIT,
                    value: result
                });
                const { name, role, location } = result;
                dispatch(loginSuccess({
                    uid: result.uuid,
                    name,
                    role,
                    location
                }));
            })
            // eslint-disable-next-line no-console
            .catch(error => {
                alert('Something went wrong! \n' + error);
                browserHistory.push('/');
                browserHistory.push('/registration');
            });
    };
};
export const registrationGetLocations = () => {
    return (dispatch) => {
        dispatch({
            type: REGISTRATION_LOCATIONS_REQUEST,
            payload: ''
        });
        let insts = [];
        Firebase.get('locations/')
            .then(result => {
                for (let inst in result) {
                    if (result.hasOwnProperty(inst))
                        result[inst].forEach(
                            element => insts.push({
                                uuid: insts.length,
                                name: element.name
                            })
                        );
                }
                insts.push({uuid: insts.length, name: 'Another Location'});
                dispatch({
                    type: REGISTRATION_GET_LOCATIONS,
                    value: insts
                });
            })
// eslint-disable-next-line no-console
            .catch(error => console.log(error));
    };
};
