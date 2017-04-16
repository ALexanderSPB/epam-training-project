import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from '../common/header';
import Footer from '../common/footer';
import InputGroup from '../common/inputGroup';

export default class App extends Component {

    render() {

        const loginFormData = [
            {
                className: 'loginForm',
                labelText: 'Email: ',
                type: 'text',
                value: 0
            },
            {
                className: 'loginForm',
                labelText: 'Пароль: ',
                type: 'password',
                value: 0

            }
        ];

        return (
            <Grid>
                <Header />
                <Row>
                    <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
                        <form>
                <InputGroup params={loginFormData} />
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} xsOffset="1" md={8} mdOffset="2">
                        <h2>Что такое MySchedule?</h2>
                        <p>
                            MySchedule - это информационный портал, который позволит вам узнать интересующее Вас расписание в 2 клика.
                        </p>
                        <h3>Являешься представителем своего заведения?</h3>
                        <p>Зарегистрируй себя и свое заведение, чтобы получить полный доступ к редактированию расписания.</p>
                        <h3>Ты преподаватель?</h3>
                        <p>Регистрируйся и делай пометки об отмене занятия.</p>
                    </Col>
                </Row>
                <Footer />
            </Grid>
    );
    }
}