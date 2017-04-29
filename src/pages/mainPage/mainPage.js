import React, { Component } from 'react';
import { Link } from 'react-router';
import DropdownMenu from '../../common/ui/selectLocation/selectLocation';

export default class MainPage extends Component {

    render() {
        return (
            <section className="row">
                <div className="col-xs-10 col-xs-offset-1 col-md-9 col-md-offset-2">
                    <h2>Что такое MySchedule?</h2>
                    <p>
                        MySchedule - это информационный портал, который позволит вам узнать интересующее Вас расписание в 2 клика.
                    </p>
                    <section>
                        <h3>Являешься представителем своего заведения?</h3>
                        <p>
                            <Link to="/">Зарегистрируй</Link> себя и свое заведение, чтобы получить полный доступ к редактированию расписания.
                        </p>
                    </section>
                    <section>
                        <h3>Ты преподаватель?</h3>
                        <p>
                            <Link to="/">Регистрируйся</Link> и делай пометки об отмене занятия.
                        </p>
                    </section>
                    <section>
                        <h3>Просто учащийся?</h3>
                        <p>
                            Воспользуйся нашим сайтом, выбери учебное заведение ниже и узнай расписание. Все просто!
                        </p>
                        {/* --- There must be a component with dropdown list and schedule --- */}
                        <DropdownMenu {...this.props}/>
                    </section>
                </div>
            </section>
        );
    }
}