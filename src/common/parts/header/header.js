import React, {Component} from 'react';
import {Link} from 'react-router';
import logo from '../../../../public/img/logo.png';
import './header.css';
import {ROUTE_PATHS} from '../../../constants/routes';

// TODO:!! прописать правильные ссылки, когда будут их адреса

class Header extends Component {

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <header className="app-header row">
                <div
                    className="app-header__logo-wrapper col-xs-2 col-sm-2 col-md-1 col-md-offset-0">
                    <Link to={ROUTE_PATHS.root} className="navbar-brand">
                        <img alt="logo" src={logo}/>
                    </Link>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-3">
                    <h1 className="my-schedule__header">My&nbsp;Schedule</h1>
                </div>
                <div
                    className="app-header__buttons col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-4">
                    <button className="button sign-in__button">
                        <Link to={ROUTE_PATHS.login}>
                            <span className="glyphicon glyphicon-log-in button__glyph"/>
                            <span className="button__text">Войти</span>
                        </Link>
                    </button>
                    <button className="button sign-up__button">
                        <Link to="/">
                            <span className="glyphicon glyphicon-edit button__glyph"/>
                            <span className="button__text">Зарегистрироваться</span>
                        </Link>
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
