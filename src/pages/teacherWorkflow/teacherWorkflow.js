import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Schedule from '../../schedule/schedule';
import {fetchEntities} from '../../constants/fetchEntityActions';
import {PATHS} from '../../constants/database';
import {TEACHERS} from '../../constants/fetchActionsTypes';
import Firebase from '../../common/helpers/firebase';
import './teacherWorkflow.css';

const mapStateToProps = state => ({
    teachers: state.teachers,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class TeacherWorkflow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTeacher: '',
        };

        const {users} = PATHS;
        props.fetchEntities(users, TEACHERS);
    }


    //TODO: get authorized teacher from localstorage
    componentWillReceiveProps(props) {
        if (props.teachers[0] !== undefined) {
            this.setState({selectedTeacher: props.teachers[0]}, this.getEvents.bind(this));
        }
    }

    getEvents() {
        const {selectedTeacher} = this.state;
        const {teachers} = this.props;
        const currentTeacher = teachers.find(teacher => teacher.uuid === selectedTeacher.uuid);
        Firebase.get(PATHS.events)
            .then(events => {
                const teacherEvents = [];
                events[currentTeacher.institution]
                    .filter(event => event.teacher.uuid === currentTeacher.uuid)
                    .forEach(event => teacherEvents.push(event));
                return teacherEvents;
            })
            .then(events => this.setState({events}));
        Firebase.get(PATHS.institutions)
            .then(institutions =>
                this.setState({officeHours: institutions.find(inst => inst.uuid === currentTeacher.institution).timing})
            );
    }

    render() {
        const {events, officeHours} = this.state;
        return (
            <section className="siteBody siteBody--teacherPage row">
                <section className="siteBody siteBody__description col-xs-12">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                        <p className="text-center">Now you are in section where you can check and edit your schedule.</p>
                        <ul className="text-left instructions">
                            <li>If you want to get more detail information about class, just click at corresponding
                                cell. Desired information appears in a pop-up window.
                            </li>
                            <li>To cancel your class click on 'Cancel' button.</li>
                        </ul>
                    </div>
                </section>
                <section className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                    { events !== undefined && officeHours !== undefined
                        ? <Schedule
                            events={events}
                            officeHours={officeHours}
                        />
                        : null
                    }
                </section>
            </section>
        );
    }
}

TeacherWorkflow.propTypes = {
    fetchEntities: PropTypes.func,
    teachers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWorkflow);
