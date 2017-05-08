import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from '../../../../public/img/logo.png';
import './header.css';
import { ROUTE_PATHS } from '../../../constants/routes';

class Header extends Component {

    render() {
        return(
            <header className="app_header row">
                <div className="app_header_logo_wrapper col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-3 col-md-1 col-md-offset-0">
                    <Link to={ROUTE_PATHS.root} className="navbar-brand">
                            <img alt="logo" src={logo}/>
                    </Link>
                </div>
                <div className="col-xs-6 col-sm-4 col-md-3">
                    <h1 className="my-schedule--header">My&nbsp;Schedule</h1>
                </div>
                <div className="app_header_buttons col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-4">
                    <button className="button sign-in--button">
                        <Link to={ROUTE_PATHS.login}>
                            Войти
                        </Link>
                    </button>
                    <button className="button sign-up--button">
                        <Link to="/">
                            Зарегистрироваться
                        </Link>
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;