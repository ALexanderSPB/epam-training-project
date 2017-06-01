import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import {changeSortType, createEventRequest, getEvents, editEventRequest, loadSelectsOptions} from './scheduleActions';
import {TEACHERS} from '../../../constants/fetchActionsTypes';
import {fetchEntities} from '../../../constants/fetchEntityActions';
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
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class ScheduleSection extends Component {

    constructor(props) {
        super(props);
        const {users} = PATHS;
        props.fetchEntities(users, TEACHERS);
    }

    componentWillMount() {
        this.props.loadSelectsOptions(this.props.institutionUuid);
    }

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
                <button onClick={createEvent}>{UI_TEXT.addEvent}</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSection);
