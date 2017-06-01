import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Schedule from '../../schedule/schedule';
import {fetchEntities} from '../../constants/fetchEntityActions';
import {PATHS} from '../../constants/database';
import Firebase from '../../common/helpers/firebase';
import {getEvents} from './teacherWorkflowActions';
import './teacherWorkflow.css';

const mapStateToProps = state => ({
    loginData: state.loginData,
    events: state.teacherEvents.events,
    officeHours: state.teacherEvents.institution
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    getEvents: bindActionCreators(getEvents, dispatch),
    dispatch,
});

class TeacherWorkflow extends Component {
    constructor(props) {
        super(props);
        const {institution, uuid} = this.props.loginData;
        this.props.getEvents(institution, uuid);
    }

    getEvents() {
        const {institution, uuid} = this.props.loginData;
        Firebase.get(PATHS.events)
            .then(events => {
                const teacherEvents = [];
                events[institution]
                    .filter(event => event.teacher.uuid === uuid)
                    .forEach(event => {
                        teacherEvents.push(event);
                    });
                return teacherEvents;
            })
            .then(events => this.setState({events}));
        Firebase.get(PATHS.institutions)
            .then(institutions =>
                this.setState({officeHours: institutions.find(inst => inst.uuid === institution).timing})
            );
    }

    render() {
        const {events, officeHours} = this.props;
        return (
            <section className="siteBody siteBody--teacherPage row">
                <section className="siteBody siteBody__description col-xs-12">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                        <p className="text-center">Now you are in section where you can check and edit your
                            schedule.</p>
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
    loginData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWorkflow);
