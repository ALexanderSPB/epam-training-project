import React from 'react';
import {Component} from 'react';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import logo from '../../../../public/img/logo.png';
import {ROUTE_PATHS} from '../../../constants/routes';
import * as headerActions from './headerAction';
import './header.css';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.headerActions.logOut();
        browserHistory.push('/');
    }

    loggedIn() {
        return(
            <div
                className="app-header__buttons">
                <h4 className="my-schedule__greeting">
                    Greetings, {this.props.userName}
                </h4>
                <button className="button log-out__button" onClick={this.handleClick}>
                    <span className="button__text">Log Out</span>
                    <span className="glyphicon glyphicon-edit button__glyph"/>
                </button>
            </div>
        );
    }

    loggedOut() {
        return (
            <div className="app-header__buttons col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-4">
                <Link className='link' to={ROUTE_PATHS.login}>
                <button className="button sign-in__button">
                    <span className="glyphicon glyphicon-log-in button__glyph"/>
                    <span className="button__text">Log in</span>
                </button>
                </Link>
                <Link className='link' to={ROUTE_PATHS.registration}>
                <button className="button sign-up__button">
                    <span className="glyphicon glyphicon-edit button__glyph"/>
                    <span className="button__text">Sign up</span>
                </button>
                </Link>
            </div>
        )
    }

    render() {
        return (
            <header className="app-header row">
                <div
                    className="app-header__logo-wrapper col-xs-2 col-sm-2 col-md-1 col-md-offset-0">
                    <Link to={ROUTE_PATHS.root}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-3">
                    <h4 className="my-schedule__header">
                        <Link className="linkText" to={ROUTE_PATHS.root}>
                            My&nbsp;Schedule
                        </Link>
                    </h4>
                </div>
                { this.props.userName !== ''
                    ? this.loggedIn()
                    : this.loggedOut() }
            </header>
        );
    }
}

function mapStatetoProps(state) {
    if (state.loginData.name === undefined) state.loginData = {name: ''};
    return {
        userName: state.loginData.name
    };
}

function mapDispatchtoProps(dispatch) {
    return {
        headerActions: bindActionCreators(headerActions, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
