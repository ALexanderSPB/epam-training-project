import React, {Component} from 'react';
import {Link} from 'react-router';
import './mainPage.css';
import InstitutionAndGroupScheduleSelector from './institutionAndGroupScheduleSelector/institutionAndGroupScheduleSelector';

export default class MainPage extends Component {

    render() {
        return (
            <section className="row siteBody siteBody--mainPage">
                <div className="col-xs-12">
                    <section className="row siteBody__introduction">
                        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 text-center">
                            <h2 className="siteBody__header siteBody__header--second text-center">
                                What is MySchedule?
                            </h2>
                            <p className="introduction__text">
                                MySchedule is an information portal that will allow you to easily find out the schedule you are interested in for only 2 clicks or create your own! One account - many opportunities
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
                                    Are you the representative of the institution?
                                </h3>
                                <p>
                                    <Link to="/registration">Register</Link> yourself and your institution to get full access to edit the schedule. Fill out important information, add events!
                                </p>
                            </div>
                        </section>
                        <section className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 instruction__contentCol text-center">
                            <div className="contentCol__icon">
                                <span className="glyphicon glyphicon-sunglasses"/>
                            </div>
                            <div className="contentCol__text">
                                <h3 className="siteBody__header siteBody__header--third">
                                    Are you a teacher?
                                </h3>
                                <p>
                                    <Link to="/registration">Register</Link> and make notes about the cancellation of the lesson
                                </p>
                            </div>
                        </section>
                        <section className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 instruction__contentCol text-center">
                            <div className="contentCol__icon">
                                <span className="glyphicon glyphicon-education"/>
                            </div>
                            <div className="contentCol__text">
                                <h3 className="siteBody__header siteBody__header--third">
                                    Just a student?
                                </h3>
                                <p>
                                    Use our site, choose an educational institution below, find your group and find out the schedule. It's simple! Registration is not necessary!
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
