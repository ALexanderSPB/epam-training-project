import * as firebase from 'firebase';
import {PATHS} from '../../constants/database';
import {ROLE_USER} from '../../constants/roles';

export const errorCodes = {
    auth: {
        invalidEmail: 'auth/invalid-email',
        userDisabled: 'auth/user-disabled',
        userNotFound: 'auth/user-not-found',
        wrongPassword: 'auth/wrong-password'
    }
};

export default class Firebase {
    static initialize() {
        let config = {
            apiKey: 'AIzaSyCc4oN8ZR7wz4JB6nm44-LXNN8KT7QkEU8',
            authDomain: 'myschedule-1affb.firebaseapp.com',
            databaseURL: 'https://myschedule-1affb.firebaseio.com',
            projectId: 'myschedule-1affb',
            storageBucket: 'myschedule-1affb.appspot.com',
            messagingSenderId: '209231286969'
        };
        firebase.initializeApp(config);
    }

    static signIn(email, password) {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                //Get data about user from database
                return this.get(PATHS.users + result.uid)
                    .then(userData => {
                        const {name, role, institution} = userData;
                        return {
                            uid: result.uid,
                            name,
                            role,
                            institution
                        };
                    });
            });
    }

    static signUp(email, password, name, location) {
        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                //Write rest of user data into DB
                const userUid = result.uid;

                const user = {
                    name,
                    role: ROLE_USER,
                    location
                };

                this.set(PATHS.users + userUid, user);
                return {
                    uuid: userUid,
                    ...user
                };
            });
    }

    static getEventsByGroup(institutionUid, groupUid) {
        let eventList = [];
        return this.get(PATHS.events + institutionUid)
            .then(result => {
                //Sort events by groupUid
                // eslint-disable-next-line
                result.map(obj => {
                    if (obj.group === groupUid) {
                        eventList.push(obj);
                    }
                });
            })
            .then(() => {
                return eventList;
            });
    }

    static get(path) {
        return firebase.database().ref(path).once('value').then(snapshot => {
            return snapshot.val();
        });
    }

    static set(path, obj) {
        return firebase.database().ref(path).set(obj);
    }
}
