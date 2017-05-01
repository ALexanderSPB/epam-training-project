import Firebase from "../../helpers/firebase";

const receiveEntity = (entityType, json) => ({
    type: entityType,
    payload: json,
});

const rejectEntity = (entityType, error) => ({
    type: entityType,
    payload: error,
});

export const fetchEntity = (path, entity) => dispatch => {
    return Firebase.get(path)
        .then(entityList => dispatch(receiveEntity(entity.RECEIVE, entityList)))
        .catch(error => dispatch(rejectEntity(entity.REJECT, error)));
};
