import React, {Component} from 'react';
import {Link} from 'react-router';
import logo from '../../../../public/img/logo.png';
import './header.css';
import {ROUTE_PATHS} from '../../../constants/routes';

class Header extends Component {

    render() {
        return (
            <header className="app_header row">
                <div
                    className="app_header_logo_wrapper col-xs-2 col-sm-2 col-md-1 col-md-offset-0">
                    <Link to={ROUTE_PATHS.root} className="navbar-brand">
                        <img alt="logo" src={logo}/>
                    </Link>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-3">
                    <h1 className="my-schedule--header">My&nbsp;Schedule</h1>
                </div>
                <div
                    className="app_header_buttons col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-4">
                    <button className="button sign-in--button">
                        <Link to={ROUTE_PATHS.login}>
                            <span className="glyphicon glyphicon-log-in button-glyph"/>
                            <span className="button-text">Войти</span>
                        </Link>
                    </button>
                    <button className="button sign-up--button">
                        <Link to="/">
                            <span className="glyphicon glyphicon-edit button-glyph"/>
                            <span className="button-text">Зарегистрироваться</span>
                        </Link>
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;