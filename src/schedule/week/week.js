import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeGrid from './timeGrid';
import ScheduledEvent from './scheduledEvent/scheduledEvent';
import {daysOfWeek, scheduleCellHeight} from '../../constants/scheduleOptions';

export default function Week({officeHours, events, canUserEdit}) {
    const tableHeight = scheduleCellHeight * (officeHours.closing - officeHours.opening);

    let eventsByDay = [];
    daysOfWeek.forEach((event, i) => {
        eventsByDay[i] = [];
    });

    events.forEach(event => {
        eventsByDay[moment(event.timing.beginning).isoWeekday() - 1].push(event);
    });

    function eventsOfDay(events, openingHour, cellHeight) {
        return events.map(event => {
            if (event.isActive === undefined) event.isActive = true;
            return (
                <ScheduledEvent
                    key={event.uuid}
                    uuid={event.uuid}
                    name={event.name}
                    teacher={event.teacher.name}
                    teacherId={event.teacher.uuid}
                    location={event.location.name}
                    locationId={event.location.uuid}
                    room={event.room}
                    date={new Date(event.timing.beginning)}
                    beginning={event.timing.beginning}
                    top={(new Date(event.timing.beginning).getHours() - openingHour) * cellHeight}
                    duration={event.timing.duration}
                    group={event.group}
                    height={event.timing.duration * cellHeight}
                    isActive={event.isActive}
                    isEditable={canUserEdit}
                />
            );
        });
    }

    function timeColumn(opening, closing, cellHeight) {
        let hours = [];

        for (let i = opening; i < closing; i++) {
            hours[i] = `${i}:00`;
        }
        return hours.map(hour =>
            <div
                key={hour}
                className="time-cell"
                style={{height: cellHeight + 'px'}}
            >
                {hour}
            </div>
        );
    }

    return (
        <tbody>
        <tr>
            <th
                scope='row'
                className='time-col'
            >
                {timeColumn(officeHours.opening, officeHours.closing, scheduleCellHeight)}
            </th>
            {eventsByDay.map((events, i) => //columns for each day of week
                <td
                    key={`${i}day`}
                    className='week-col'
                    style={{height: tableHeight + 'px'}}
                >
                    <TimeGrid
                        cellHeight={scheduleCellHeight}
                        numOfCells={officeHours.closing - officeHours.opening}
                    />
                    {eventsOfDay(events, officeHours.opening, scheduleCellHeight)}
                </td>
            )}
        </tr>
        </tbody>
    );
}

Week.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired,
    canUserEdit: PropTypes.bool
};
