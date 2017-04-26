import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import App from './pages/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import initFirebase from './firebase/initFirebase';
import signIn from './firebase/signIn';
import signUp from './firebase/signUp';

const store = configureStore();

initFirebase(); //TMP
signUp('hthtrhth@gmail.com', 'zxcththyhyhyyhvbn', 'asasasasasasa');

export const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
