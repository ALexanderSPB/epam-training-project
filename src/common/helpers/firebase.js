import * as firebase from 'firebase';

const databasePath = {
    users: 'users/',
    events: 'events/',
    locations: 'locations/'
};

export default class LocalStorage {
    static initialize() {
        let config = {
            apiKey: "AIzaSyCc4oN8ZR7wz4JB6nm44-LXNN8KT7QkEU8",
            authDomain: "myschedule-1affb.firebaseapp.com",
            databaseURL: "https://myschedule-1affb.firebaseio.com",
            projectId: "myschedule-1affb",
            storageBucket: "myschedule-1affb.appspot.com",
            messagingSenderId: "209231286969"
        };
        firebase.initializeApp(config);
    }

    static signIn(email, password) {
        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(result => {
                //Get data about user from database
                this.get(databasePath.users + result.uid)
                    .then(userData => {
                        let username = userData.name;
                        return {
                            uid: result.uid,
                            name: username
                        };
                    });
            })
    }

    static signUp(email, password, name) {
        const userDefaultRole = 3;

        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                //Write rest of user data into DB
                let userUid = result.uid;
                this.set(databasePath.users + userUid, {
                    name: name,
                    role: userDefaultRole
                });
            });
    }

    static getEventsByGroup(institutionUid, groupUid) {
        let eventList = [];
        return this.get(databasePath.events + institutionUid)
            .then(result => {
                //Sort events by groupUid
                result.map(obj => {
                    if (obj.group === groupUid) {
                        eventList.push(obj);
                    }
                });
            })
            .then(() => {
                //Get additional information about event from other objects of database
                eventList.map((event, i) => {
                    this.get(databasePath.users + event.teacher)
                        .then(snapshot => {
                            eventList[i]['teacherName'] = snapshot.name;
                        });
                    this.get(`${databasePath.locations}${institutionUid}/${event.location}`)
                        .then(snapshot => {
                            eventList[i]['locationName'] = snapshot.name;
                        });
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