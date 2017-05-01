import React, { Component } from 'react';
import { Link } from 'react-router';
import Input from '../../common/ui/input';
import './loginPage.css';

export default class LoginPage extends Component {

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
                    <form className="siteBody__loginForm form-horizontal">
                        <Input
                            inputId={loginFormData[0].inputId}
                            classes={loginFormData[0].classes}
                            placeholder={loginFormData[0].placeholder}
                            labelText={loginFormData[0].labelText}
                            type={loginFormData[0].type}
                            value={loginFormData[0].value}
                        />
                        <Input
                            inputId={loginFormData[1].inputId}
                            classes={loginFormData[1].classes}
                            placeholder={loginFormData[1].placeholder}
                            labelText={loginFormData[1].labelText}
                            type={loginFormData[1].type}
                            value={loginFormData[1].value}
                        />
                        <div className="row">
                            <div className="col-xs-4">
                                <button className="btn loginForm__submitBtn">
                                    Войти
                                </button>
                            </div>
                            <div className="col-xs-8 text-right">
                                <p className="loginForm__registrationComment">
                                    Нет аккаунта? <Link to="/">Зарегистрируйся</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}