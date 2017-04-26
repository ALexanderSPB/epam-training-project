import * as firebase from 'firebase';

export default function (email, password, name, handleSuccess, handleError) {
    const userDefaultRole = 3;

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            //Write all other user data
            let userUid = result.uid;
            firebase.database().ref('users/' + userUid).set({
                name: name,
                role: userDefaultRole
            }).then(function() {
                handleSuccess(userUid, name);
            });
        })
        .catch(function(error) {
            handleError(error.code, error.message);
        });
}