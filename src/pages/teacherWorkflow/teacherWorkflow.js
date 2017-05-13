import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Schedule from '../../schedule/schedule';
import {fetchEntities} from '../mainPage/institutionAndGroupScheduleSelector/fetchEntityActions';
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
                <div className="col-xs-12">
                    <section className="siteBody siteBody__description row">
                        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 text-center">
                            <p>Вы перешли в раздел просмотра и редактирования своего расписания.</p>
                            <p>Для просмотра подробностей занятия нажмите на нужную Вам ячейку в таблице.
                                В появившемся окне отобразится подробная информация о выбранном занятии. Для отмены
                                занятия нажмите кнопку "Отмена".</p>
                        </div>
                    </section>
                    <section className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 ">
                        { events !== undefined && officeHours !== undefined
                            ? <Schedule
                                events={events}
                                officeHours={officeHours}
                            />
                            : null
                        }
                    </section>
                </div>
            </section>
        );
    }
}

TeacherWorkflow.propTypes = {
    fetchEntities: PropTypes.func,
    teachers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWorkflow);
