import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import {changeSortType, createEventRequest, getEvents, editEventRequest, loadSelectsOptions, addEvent} from './scheduleActions';
import Modal from '../../../common/ui/modal/modalComponent';
import Input from '../../../common/ui/input';

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
    institutionUuid: state.loginData.institution || 'inst0' //tmp test string 'inst0'
});

const mapDispatchToProps = dispatch => ({
    changeSortType: bindActionCreators(changeSortType, dispatch),
    createEvent: bindActionCreators(createEventRequest, dispatch),
    getEvents: bindActionCreators(getEvents, dispatch),
    editEventRequest: bindActionCreators(editEventRequest, dispatch),
    loadSelectsOptions: bindActionCreators(loadSelectsOptions, dispatch),
    addEvent: bindActionCreators(addEvent, dispatch),
    dispatch,
});

class ScheduleSection extends Component {

    componentWillMount() {
        this.props.loadSelectsOptions(this.props.institutionUuid);
    }

    constructor(props, context) {
        super(props, context);
        this.addButtonHandleClick = this.addButtonHandleClick.bind(this);
        this.state = {
            teachers: [],
            locations: [],
            groups: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.schedule.lists) {
            if (nextProps.schedule.lists.teachers)
                this.setState({teachers: nextProps.schedule.lists.teachers});
            if (nextProps.schedule.lists.locations)
                this.setState({locations: nextProps.schedule.lists.locations});
            if (nextProps.schedule.lists.groups)
                this.setState({groups: nextProps.schedule.lists.groups});
        };
    }

    addButtonHandleClick() {
        let date = new Date();
        date.setMonth = this.state.month;
        date.setDate = this.state.date;
        date.setHours = this.state.hours;
        let event = {
            "uuid": this.state.name + date.getMilliseconds(),
            "name": this.state.name,
            "skills": [0, 2],
            "timing": {
                "duration": this.state.duration,
                "beginning": date
            },
            "type": "",
            "teacher": {
                "uuid": "fyHa2LjckRTfuSfMRWAOdWAUAgG3",
                "name": this.state.teacher
            },
            "location": {
                "uuid": 0,
                "name": this.state.location
            },
            "room": this.state.room,
            "group": {
                "uuid": this.state.group + this.state.room,
                "name": this.state.group
            }
        };
        this.props.addEvent(event);
    }

    render() {
        const inputClasses = {
            label: 'col-xs-2',
            inputWrapper: 'col-xs-9',
            error: 'col-xs-3 text-danger',
            input: ''
        };
        const selectClasses = {
            label: 'col-xs-3',
            selectWrapper: 'col-xs-8',
            select: ''
        };
        const { sortType, sortOptions, events } = this.props.schedule;
        const { changeSortType, getEvents, editEventRequest, createEvent, institutionUuid } = this.props;

        return (
            <section>
                <Modal openButtonTitle={UI_TEXT.addEvent}
                       title="Add new event"
                       footerButtons={[{text: 'Add event', type: 'success', onClick: this.addButtonHandleClick }]}>
                    <section className="row">
                        <form className="form-horizontal">
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'name': v}) }
                                labelText="Name"
                                type="text"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'month': v}) }
                                labelText="Month"
                                type="text"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'date': v}) }
                                labelText="Date"
                                type="text"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'hours': v}) }
                                labelText="Hours"
                                type="text"
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'duration': v}) }
                                labelText="Duration"
                                type="text"
                            />
                            <Select
                                classes={selectClasses}
                                valueChanged={ v => this.setState({'teacher': v}) }
                                options={this.state.teachers}
                                labelText="Teacher"
                                type="text"
                            />
                            <Select
                                classes={selectClasses}
                                valueChanged={ v => this.setState({'group': v}) }
                                options={this.state.groups}
                                labelText="Group"
                                type="text"
                            />
                            <Select
                                classes={selectClasses}
                                options={this.state.locations}
                                valueChanged={ v => this.setState({'location': v}) }
                                labelText="Location"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={inputClasses}
                                valueChanged={ v => this.setState({'room': v}) }
                                labelText="Room"
                                type="text"
                            />
                        </form>
                    </section>
                </Modal>
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
    getEvents: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSection);
