import React from 'react';
import {browserHistory} from 'react-router';
import logo from '../../../../public/img/logo.png';
import {ROUTE_PATHS} from '../../../constants/routes';
import './header.css';

const Header = () => {

    function goToPage(page) {
        browserHistory.push(page);
    }

    return (
        <header className="app-header row">
            <div
                className="app-header__logo-wrapper col-xs-2 col-sm-2 col-md-1 col-md-offset-0">
                <a onClick={() => goToPage(ROUTE_PATHS.root)} className="navbar-brand">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <div className="col-xs-4 col-sm-4 col-md-3">
                <h1 onClick={() => goToPage(ROUTE_PATHS.root)} className="my-schedule__header">
                    My&nbsp;Schedule
                </h1>
            </div>
            <div
                className="app-header__buttons col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-4">
                <button onClick={() => goToPage(ROUTE_PATHS.login)} className="button sign-in__button">
                    <span className="glyphicon glyphicon-log-in button__glyph"/>
                    <span className="button__text">Войти</span>
                </button>
                <button onClick={() => goToPage(ROUTE_PATHS.registration)} className="button sign-up__button">
                    <span className="glyphicon glyphicon-edit button__glyph"/>
                    <span className="button__text">Зарегистрироваться</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
