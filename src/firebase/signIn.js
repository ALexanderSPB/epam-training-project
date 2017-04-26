import * as firebase from 'firebase';

export default function (email, password, handleSuccess, handleError) {
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {
            firebase.database().ref('/users/' + result.uid).once('value')
                .then(function(snapshot) {
                    let username = snapshot.val().name;
                    handleSuccess(result.uid, username);
                });
        })
        .catch(function(error) {
            handleError(error.code, error.message);
        });
}