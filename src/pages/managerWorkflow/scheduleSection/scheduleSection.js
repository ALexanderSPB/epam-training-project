import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import {changeSortType, createEventRequest, getEvents, editEventRequest, loadSelectsOptions} from './scheduleActions';
import Modal from '../../../common/ui/modal/modalComponent';
import Input from '../../../common/ui/input';
import Firebase from '../../../common/helpers/firebase';
import {PATHS} from '../../../constants/database';

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
    dispatch,
});

class ScheduleSection extends Component {

    componentWillMount() {
        this.props.loadSelectsOptions(this.props.institutionUuid);
    }

    constructor(props, context) {
        super(props, context);
        this.addButtonHandleClick = this.addButtonHandleClick.bind(this);
    };

    addButtonHandleClick() {
        let event = {
            "name": this.state.name,
            "timing": {
                "duration": this.state.duration,
                "beginning": this.state.beginning
            },
            "type": "",
            "teacher": {
                "uuid": "fyHa2LjckRTfuSfMRWAOdWAUAgG3",
                "name": this.state.teacher
            },
            "location": {
                "name": this.state.location
            },
            "room": this.state.room,
            "group": {
                "uuid": "group0x1x42",
                "name": this.state.group
            }
        };
        Firebase.set(PATHS.events, event);
    };

    render() {
        const { sortType, sortOptions, events } = this.props.schedule;
        const { changeSortType, getEvents, editEventRequest, createEvent, institutionUuid } = this.props;

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
                                classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: ''
                            }}
                                valueChanged={ v => this.setState({'name': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Name"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: ''
                            }}
                                valueChanged={ v => this.setState({'beginning': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Beginning"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                    label: 'col-xs-2',
                                    inputWrapper: 'col-xs-7',
                                    error: 'col-xs-3 text-danger',
                                    input: ''
                                }}
                                valueChanged={ v => this.setState({'duration': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Duration"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: ''
                            }}
                                valueChanged={ v => this.setState({'teacher': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Teacher"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: ''
                            }}
                                valueChanged={ v => this.setState({'location': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Location"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: ''
                            }}
                                valueChanged={ v => this.setState({'room': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Room"
                                type="text"
                                error=""
                            />
                            <Input
                                classes={{
                                    label: 'col-xs-2',
                                    inputWrapper: 'col-xs-7',
                                    error: 'col-xs-3 text-danger',
                                    input: ''
                                }}
                                valueChanged={ v => this.setState({'group': v}) }
                                inputId=""
                                placeholder=""
                                labelText="Group"
                                type="text"
                                error=""
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
    getEvents: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSection);
