import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { rootReducer }from '../reducers';
import { redirect } from '../middleware/redirect';

export default function configureStore() {
    const store = compose(
        applyMiddleware(thunkMiddleware),
        applyMiddleware(createLogger()),
        applyMiddleware(redirect),
        persistState()
    )(createStore)(rootReducer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').rootReducer;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};
