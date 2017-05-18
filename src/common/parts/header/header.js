import React from 'react';
import {browserHistory} from 'react-router';
import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import logo from '../../../../public/img/logo.png';
import {ROUTE_PATHS} from '../../../constants/routes';
import * as headerActions from './headerAction';
import './header.css';

class Header extends Component {

    constructor(props, context){
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    goToPage(page) {
        browserHistory.push(page);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.headerActions.logOut();
    }

    loggedIn() {
        return(
            <div
                className="app-header__buttons">
                <h4 className="my-schedule__header">
                    Greetings, {this.props.userName}
                </h4>
                <button className="button log-out__button" onClick={this.handleClick}>
                    <span className="button__text">Log Out</span>
                    <span className="glyphicon glyphicon-edit button__glyph"/>
                </button>
            </div>
        )
    }

    loggedOut(){
        return (
            <div className="app-header__buttons col-xs-4 col-xs-offset-2 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-4">
                <button className="button sign-in__button">
                    <span className="glyphicon glyphicon-log-in button__glyph"/>
                    <Link to={ROUTE_PATHS.login}><span className="button__text">Log in</span></Link>
                </button>
                <button className="button sign-up__button">
                    <span className="glyphicon glyphicon-edit button__glyph"/>
                    <Link to={ROUTE_PATHS.registration}><span className="button__text">Sign up</span> </Link>
                </button>
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
                        My&nbsp;Schedule
                    </h4>
                </div>
                { this.props.userName !== '' && this.loggedIn() }
                { this.props.userName === '' && this.loggedOut() }
            </header>
        );
    }
}

function mapStatetoProps(state) {
    if (state.loginData.user === undefined) state.loginData.user = {name: ''};
    return {
        userName: state.loginData.user.name
    };
}

function mapDispatchtoProps(dispatch) {
    return {
        headerActions: bindActionCreators(headerActions, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
