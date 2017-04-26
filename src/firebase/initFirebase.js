import * as firebase from 'firebase';

export default function () {
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