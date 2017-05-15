import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import {changeSortType, createEventRequest, getEvents, editEventRequest} from './scheduleActions';

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

const institutionId = 'inst0'; //TODO: replace this temporary constant after institution info is stored somewhere
const institutionTiming = {
    opening: 9,
    closing: 23
};

const mapStateToProps = state => ({
    schedule: state.schedule
});

const mapDispatchToProps = dispatch => ({
    changeSortType: bindActionCreators(changeSortType, dispatch),
    createEvent: bindActionCreators(createEventRequest, dispatch),
    getEvents: bindActionCreators(getEvents, dispatch),
    editEventRequest: bindActionCreators(editEventRequest, dispatch),
    dispatch,
});

// eslint-disable-next-line no-unused-vars
class ScheduleSection extends Component {

    render() {
        const { sortType, sortOptions, events } = this.props.schedule;
        const { changeSortType, getEvents, editEventRequest, createEvent } = this.props;

        return (
            <section>
                <Select
                    labelText={UI_TEXT.sortBy}
                    options={SORT_EVENTS_OPTIONS}
                    valueChanged={(newSortType) => changeSortType(newSortType, institutionId)}
                />
                { sortOptions
                    ? <Select
                        labelText={UI_TEXT.select[sortType]}
                        options={sortOptions}
                        valueChanged={(uuid) => getEvents(institutionId, sortType, uuid)}
                    />
                    : null
                }
                { events !== undefined
                    ? <Schedule
                        events={events}
                        officeHours={institutionTiming}
                        onEventClick={editEventRequest}
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
    getEvents: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleSection);
