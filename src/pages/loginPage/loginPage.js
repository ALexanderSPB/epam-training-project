import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/ui/input';
import { loginAttempt } from './loginActions';

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
        this.setState({ [field]: value });
    }

    render() {

        const loginFormData = [
            {
                inputId: 'loginForm__email',
                classes: {
                    wrapper: '',
                    label: 'col-xs-2',
                    inputWrapper: 'col-xs-10',
                    input: ''
                },
                placeholder: 'email@smth.com',
                labelText: 'Email: ',
                type: 'text'
            },
            {
                inputId: 'loginForm__password',
                classes: {
                    wrapper: '',
                    label: 'col-xs-2',
                    inputWrapper: 'col-xs-10',
                    input: ''
                },
                placeholder: 'Type password',
                labelText: 'Пароль: ',
                type: 'password'
            }
        ];

        return (
            <section className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <form
                        className="form-horizontal"
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
                        <button className="btn btn-success">Войти</button>
                    </form>
                    <p>Нет аккаунта?
                        <button className="btn btn-link">
                            <Link to="/">Зарегистрируйся</Link>
                        </button>
                    </p>
                </div>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);