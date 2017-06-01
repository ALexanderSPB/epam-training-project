import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import {TEACHERS} from '../../../constants/fetchActionsTypes';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {changeSortType, createEventRequest, getEvents, editEventRequest, loadSelectsOptions, addEvent} from './scheduleActions';
import Modal from '../../../common/ui/modal/modalComponent';
import Input from '../../../common/ui/input';
import { eventBeginning } from '../../../constants/dateTimeFormats';

const UI_TEXT = {
    addEvent: 'Add event',
    sortBy: 'Sort by',
    select: ['Select group', 'Select teacher']
};

export const SORT_EVENTS_OPTIONS = [
    {
        uuid: 'group',
        name: 'Group'
    },
    {
        uuid: 'teacher',
        name: 'Teacher'
    }
];

const institutionTiming = {
    opening: 9,
    closing: 23
};

const mapStateToProps = state => ({
    schedule: state.schedule,
    institutionUuid: state.loginData.institution || 'inst0', //tmp test string 'inst0'
    locations: state.locations,
    teachers: state.teachers
});

const mapDispatchToProps = dispatch => ({
    changeSortType: bindActionCreators(changeSortType, dispatch),
    createEvent: bindActionCreators(createEventRequest, dispatch),
    getEvents: bindActionCreators(getEvents, dispatch),
    editEventRequest: bindActionCreators(editEventRequest, dispatch),
    loadSelectsOptions: bindActionCreators(loadSelectsOptions, dispatch),
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch),
    dispatch,
});

class ScheduleSection extends Component {

    constructor(props, context) {
        super(props, context);
        const {users} = PATHS;
        props.fetchEntities(users, TEACHERS);
        this.addButtonHandleClick = this.addButtonHandleClick.bind(this);
        this.state = {
            teachers: [],
            locations: [],
            groups: []
        };
    }

    componentWillMount() {
        this.props.loadSelectsOptions(this.props.institutionUuid);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.schedule.lists) return;
        for (let field of ['groups', 'locations', 'teachers']) {
            if (nextProps.schedule.lists[field]) this.setState({[field]: nextProps.schedule.lists[field]});
        }
    }

    addButtonHandleClick() {
        let teacherUuid = this.props.teachers.find( t => t.name === this.state.teacher).uuid;
        let groupName = this.props.schedule.lists.groups.find( (element) => element.uuid === this.state.group).name;
        let locationUuid = this.props.locations.findIndex( (element) => element.name === this.state.location);
        let newTime = moment(this.state.beginning, eventBeginning);
        if (!newTime.isValid()) this.setState({beginningError: 'Wrong Time'});
        else {
            let event = {
                uuid: this.state.name + newTime._d.getMilliseconds(),
                name: this.state.name,
                skills: [0, 2],
                timing: {
                    duration: this.state.duration,
                    beginning: newTime.toDate() + ''
                },
                type: 'event',
                teacher: {
                    uuid: teacherUuid,
                    name: this.state.teacher
                },
                location: {
                    uuid: locationUuid,
                    name: this.state.location
                },
                room: this.state.room,
                group: {
                    uuid: this.state.group,
                    name: groupName
                }
            };
            this.props.addEvent(event, this.props.institutionUuid, this.props.schedule.events.length);
        }
    }

    render() {
        const inputClasses = {
            label: 'col-xs-2',
            inputWrapper: 'col-xs-9',
            error: 'col-xs-3 text-danger'
        };
        const selectClasses = {
            label: 'col-xs-3',
            selectWrapper: 'col-xs-8'
        };
        const { sortType, sortOptions, events } = this.props.schedule;
        const { changeSortType, getEvents, editEventRequest, institutionUuid } = this.props;

        return (
            <section>
                <Select
                    labelText={UI_TEXT.sortBy}
                    options={SORT_EVENTS_OPTIONS}
                    valueChanged={(newSortType) => changeSortType(newSortType, institutionUuid)}
                />
                { sortOptions
                    ? <Select
                        labelText={UI_TEXT.select[sortType]}
                        options={sortOptions}
                        valueChanged={(uuid) => getEvents(institutionUuid, sortType, uuid)}
                    />
                    : null
                }
                { events !== undefined
                    ? <Schedule
                        events={events}
                        officeHours={institutionTiming}
                        onEventClick={editEventRequest}
                        canUserEdit={true}
                    />
                    : null
                }
                <Modal openButtonTitle={UI_TEXT.addEvent}
                       title="Add new event"
                       footerButtons={[{text: 'Add event', type: 'success', onClick: this.addButtonHandleClick }]}>
                    <section className="row">
                        <form className="form-horizontal">
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'name': v}) }
                                labelText="Name"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'beginning': v}) }
                                labelText="Beginning"
                                error={this.state.beginningError}
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'duration': v}) }
                                labelText="Duration"
                                type="number"
                            />
                            <Select
                                classes={selectClasses}
                                valueChanged={ v => this.setState({'teacher': v}) }
                                options={this.state.teachers}
                                labelText="Teacher"
                            />
                            <Select
                                classes={selectClasses}
                                valueChanged={ v => this.setState({'group': v}) }
                                options={this.state.groups}
                                labelText="Group"
                            />
                            <Select
                                classes={selectClasses}
                                options={this.state.locations}
                                valueChanged={ v => this.setState({'location': v}) }
                                labelText="Location"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'room': v}) }
                                labelText="Room"
                            />
                        </form>
                    </section>
                </Modal>
            </section>
        );
    }
}

ScheduleSection.propTypes = {
    changeSortType: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    editEventRequest: PropTypes.func.isRequired,
    schedule: PropTypes.object.isRequired,
    institutionUuid: PropTypes.string.isRequired,
    loadSelectsOptions: PropTypes.func.isRequired,
    getEvents: PropTypes.func,
    fetchEntities: PropTypes.func,
    addEvent: PropTypes.func,
    locations: PropTypes.array,
    teachers: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSection);
