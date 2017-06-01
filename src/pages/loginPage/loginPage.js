import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from '../../common/ui/input';
import {loginAttempt} from './loginActions';
import {ROUTE_PATHS} from '../../constants/routes';
import './loginPage.css';

const mapStateToProps = state => ({
    loginData: state.loginData
});

const mapDispatchToProps = dispatch => ({
    loginAttempt: bindActionCreators(loginAttempt, dispatch),
    dispatch,
});

class LoginPage extends Component {

    handleSubmit(e) {
        e.preventDefault();
        if (this.state)
            this.props.loginAttempt(this.state.email, this.state.password);
        else
            this.props.loginAttempt('', '');
    }

    set(value, field) {
        this.setState({[field]: value});
    }

    render() {

        const loginFormData = [
            {
                inputId: 'loginForm__email',
                classes: {
                    label: 'col-xs-3 col-sm-2 loginForm__label',
                    inputWrapper: 'col-xs-9 col-sm-10',
                    input: 'loginForm__input'
                },
                placeholder: 'email@smth.com',
                labelText: 'Email: ',
                type: 'text'
            },
            {
                inputId: 'loginForm__password',
                classes: {
                    label: 'col-xs-3 col-sm-2 loginForm__label',
                    inputWrapper: 'col-xs-9 col-sm-10',
                    input: 'loginForm__input'
                },
                placeholder: 'Type password',
                labelText: 'Пароль: ',
                type: 'password'
            }
        ];

        return (
            <section className="siteBody siteBody--loginPage row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <form
                        className="siteBody__loginForm form-horizontal"
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <Input
                            inputId={loginFormData[0].inputId}
                            classes={loginFormData[0].classes}
                            placeholder={loginFormData[0].placeholder}
                            labelText={loginFormData[0].labelText}
                            type={loginFormData[0].type}
                            valueChanged={(value) => this.set(value, 'email')}
                            error={this.props.loginData.error ? this.props.loginData.error.email : null}
                        />
                        <Input
                            inputId={loginFormData[1].inputId}
                            classes={loginFormData[1].classes}
                            placeholder={loginFormData[1].placeholder}
                            labelText={loginFormData[1].labelText}
                            type={loginFormData[1].type}
                            valueChanged={(value) => this.set(value, 'password')}
                            error={this.props.loginData.error ? this.props.loginData.error.password : null}
                        />
                        <div className="row">
                            <div className="col-xs-4">
                                <button className="btn loginForm__submitBtn">
                                    Sign in
                                </button>
                            </div>
                            <div className="col-xs-8 text-right">
                                <p className="loginForm__registrationComment">
                                    No account? <Link to={ROUTE_PATHS.registration}>Register now</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

LoginPage.propTypes = {
    loginAttempt: PropTypes.func.isRequired,
    loginData: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
