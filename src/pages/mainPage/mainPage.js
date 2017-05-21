import React, {Component} from 'react';
import {Link} from 'react-router';
import './mainPage.css';
import InstitutionAndGroupScheduleSelector from './institutionAndGroupScheduleSelector/institutionAndGroupScheduleSelector';
import TestModal from '../../pages/managerWorkflow/locationsSection/modals/testModal';

export default class MainPage extends Component {

    render() {
        return (
            <section className="row siteBody siteBody--mainPage">
                <TestModal {...this.props}/>
                <div className="col-xs-12">
                    <section className="row siteBody__introduction">
                        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 text-center">
                            <h2 className="siteBody__header siteBody__header--second text-center">
                                Что такое MySchedule?
                            </h2>
                            <p>
                                MySchedule - это информационный портал, который позволит вам легко узнать интересующее Вас расписание в 2 клика или создать своё собственное!<br/>Один аккаунт - множество возможностей
                            </p>
                        </div>
                    </section>
                    <section className="row siteBody__instruction">
                        <section className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 instruction__contentCol text-center">
                            <div className="contentCol__icon">
                                <span className="glyphicon glyphicon-briefcase"/>
                            </div>
                            <div className="contentCol__text">
                                <h3 className="siteBody__header siteBody__header--third">
                                    Ты представитель заведения?
                                </h3>
                                <p>
                                    <Link to="/registration">Зарегистрируй</Link> себя и свое заведение, чтобы получить полный доступ к редактированию расписания. Заполняй важную информацию, добавляй события!
                                </p>
                            </div>
                        </section>
                        <section className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 instruction__contentCol text-center">
                            <div className="contentCol__icon">
                                <span className="glyphicon glyphicon-sunglasses"/>
                            </div>
                            <div className="contentCol__text">
                                <h3 className="siteBody__header siteBody__header--third">
                                    Ты преподаватель?
                                </h3>
                                <p>
                                    <Link to="/registration">Регистрируйся</Link> и делай пометки об отмене занятия.
                                </p>
                            </div>
                        </section>
                        <section className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 instruction__contentCol text-center">
                            <div className="contentCol__icon">
                                <span className="glyphicon glyphicon-education"/>
                            </div>
                            <div className="contentCol__text">
                                <h3 className="siteBody__header siteBody__header--third">
                                    Просто учащийся?
                                </h3>
                                <p>
                                    Воспользуйся нашим сайтом, выбери учебное заведение ниже, найди свою группу и узнай расписание. Все просто! Регистрироваться нет необходимости!
                                </p>
                            </div>
                        </section>
                    </section>
                        <InstitutionAndGroupScheduleSelector {...this.props}/>
                </div>
            </section>
        );
    }
}
