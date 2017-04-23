import React, { Component } from 'react';
import { Link } from 'react-router';
import Input from '../../common/ui/input';

export default class LoginPage extends Component {

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
                type: 'text',
                value: ''
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
                type: 'password',
                value: ''
            }
        ];

        return (
            <section className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <form className="form-horizontal">
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