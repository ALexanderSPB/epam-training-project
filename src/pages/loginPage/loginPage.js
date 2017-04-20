import React, { Component } from 'react';
import { Link } from 'react-router';
import Input from '../common/UI/input';

export default class LoginPage extends Component {

    render() {

        const loginFormData = [
            {
                inputId: 'loginForm__email',
                placeholder: 'email@smth.com',
                labelText: 'Email: ',
                type: 'text'
            },
            {
                inputId: 'loginForm__password',
                placeholder: 'Type password',
                labelText: 'Пароль: ',
                type: 'password'
            }
        ];

        return (
            <section className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <form>
                        <Input
                            inputId={loginFormData[0].inputId}
                            placeholder={loginFormData[0].placeholder}
                            labelText={loginFormData[0].labelText}
                            type={loginFormData[0].type}
                        />
                        <Input
                            inputId={loginFormData[1].inputId}
                            placeholder={loginFormData[1].placeholder}
                            labelText={loginFormData[1].labelText}
                            type={loginFormData[1].type}
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