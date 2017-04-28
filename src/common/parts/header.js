import React, { Component } from 'react';
import { Link } from 'react-router';
import favicon from '../../../public/favicon.ico';
import './headerStyle.css';

class Header extends Component {

    render() {
        return(
            <div className="app_header row">
                <div className="app_header_logo_wrapper col-xs-3">
                    <Link to="/">
                        <img src={favicon} alt="logo"/>
                    </Link>
                </div>
                <div className="col-xs-6">
                    <h1>MySchedule</h1>
                </div>
                <div className="app_header_buttons col-xs-3">
                    <button>
                        <Link to="/">
                            Войти
                        </Link>
                    </button>
                    <button>
                        <Link to="/">
                            Зарегистрироваться
                        </Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Header;