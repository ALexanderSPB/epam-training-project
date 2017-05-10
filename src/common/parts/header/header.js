import React from 'react';
import {browserHistory} from 'react-router';
import favicon from '../../../../public/favicon.ico';
import './headerStyle.css';
import {ROUTE_PATHS} from '../../../constants/routes';

const Header = () => {

    function goToPage(page) {
        browserHistory.push(page);
    }

    return(
        <header className="app_header row">
            <div className="app_header_logo_wrapper col-xs-3">
                <a onClick={() => goToPage(ROUTE_PATHS.root)}>
                    <img src={favicon} alt="logo"/>
                </a>
            </div>
            <div className="col-xs-6">
                <h1>MySchedule</h1>
            </div>
            <div className="app_header_buttons col-xs-3">
                <button onClick={() => goToPage(ROUTE_PATHS.login)} className="btn">
                    Войти
                </button>
                <button onClick={() => goToPage(ROUTE_PATHS.registration)} className="btn">
                    Зарегистрироваться
                </button>
            </div>
        </header>
    );
}

export default Header;
