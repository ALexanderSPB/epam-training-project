import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
//import { Link } from 'react-router';
import './workflowTeacher.css';
import Select from '../../common/ui/select';
import Schedule from '../../schedule/schedule';
import {fetchEntities} from '../../common/ui/institutionAndGroupScheduleSelector/fetchEntityActions';
import {PATHS} from '../../constants/database';
import {EVENTS, TEACHERS} from '../../constants/fetchActionsTypes';
import Firebase from '../../common/helpers/firebase';

const mapStateToProps = state => ({
    teachers: state.teachers,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class WorkflowTeacher extends Component {
    constructor(props) {
        super(props);
        this.handleSelectTeacher = this.handleSelectTeacher.bind(this);

        this.state = {
            selectedTeacher: '',
        };

        const {users} = PATHS;
        props.fetchEntities(users, TEACHERS);
    }

    handleSelectTeacher(selected) {
        this.setState({selectedTeacher: selected},
            this.getEvents.bind(this)
        );
    }

    getEvents() {
        const {selectedTeacher} = this.state;
        Firebase.get(PATHS.events)
            .then(events => {
                const teacherEvents = [];
                Object.keys(events)
                    .forEach(key => events[key]
                        .filter(event => event.teacher.uuid === selectedTeacher)
                        .forEach(event => teacherEvents.push(event)));
                return teacherEvents;
            })
            .then(events => this.setState({events}));
    }

    render() {
        const {events} = this.state;
        const {teachers} = this.props;
        return (
            <section className="siteBody siteBody--workflowTeacherPage row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <p>hey</p>
                    {teachers.map(t => <p key={t.uuid}>{t.uuid} {t.name}</p>)}
                    <Select
                        options={teachers}
                        valueChanged={this.handleSelectTeacher}
                    />
                    { events !== undefined
                        ? <Schedule
                            events={events}
                            officeHours={{
                                opening: 8,
                                closing: 23
                            }}
                        />
                        : null
                    }
                </div>
            </section>
        );
    }
}

WorkflowTeacher.propTypes = {
    fetchEntities: PropTypes.func,
    teachers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowTeacher);
