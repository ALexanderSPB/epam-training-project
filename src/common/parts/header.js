import React, { Component } from 'react';
import { Link } from 'react-router';
import favicon from '../../../public/favicon.ico';
import './headerStyle.css';
import { ROUTE_PATHS } from '../../constants/routes';

// TODO:!! прописать правильные ссылки, когда будут их адреса

class Header extends Component {

    render() {
        return(
            <header className="app_header row">
                <div className="app_header_logo_wrapper col-xs-3">
                    <Link to={ROUTE_PATHS.root}>
                        <img src={favicon} alt="logo"/>
                    </Link>
                </div>
                <div className="col-xs-6">
                    <h1>MySchedule</h1>
                </div>
                <div className="app_header_buttons col-xs-3">
                    <button>
                        <Link to={ROUTE_PATHS.login}>
                            Войти
                        </Link>
                    </button>
                    <button>
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
