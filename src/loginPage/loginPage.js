import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from '../common/header';
import Footer from '../common/footer';
import Input from '../common/input';

export default class LoginPage extends Component {

    render() {

        const loginFormData = [
            {
                className: 'loginForm',
                labelText: 'Email: ',
                type: 'text',
                value: ''
            },
            {
                className: 'loginForm',
                labelText: 'Пароль: ',
                type: 'password',
                value: ''
            }
        ];

        return (
            <container>
                <Header />
                <section className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                        <form>
                            <Input
                                className={loginFormData[0].className}
                                labelText={loginFormData[0].labelText}
                                type={loginFormData[0].type}
                                value={loginFormData[0].value}
                            />
                            <Input
                                className={loginFormData[1].className}
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
                <Footer />
            </container>
        );
    }
}