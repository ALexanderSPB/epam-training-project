import Firebase from '../common/helpers/firebase';

const receiveEntity = (type, json) => ({
    type,
    payload: json,
});

const rejectEntity = (type, error) => ({
    type,
    payload: error,
});

export const fetchEntities = (path, entity) => dispatch => {
    return Firebase.get(path)
        .then(entityList => dispatch(receiveEntity(entity.RECEIVE, entityList)))
        .then(entityList => {
            return entityList.filter((entity) => {
                return entity !== null || undefined;
            });
        })
        .catch(error => dispatch(rejectEntity(entity.REJECT, error)));
};
