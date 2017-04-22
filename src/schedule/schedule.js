import React, { PropTypes } from 'react';
import { daysOfWeek } from './../constants';
import Row from './row/row';

export default function Schedule({officeHours, events}) {
        return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-1">time</div>
                {daysOfWeek.map((day) => //generating head of "table"
                    <div
                        key={day}
                        className="col-md-1"
                    >
                        {day}
                    </div>
                )}
            </div>
            <Row
                events={events}
                officeHours={officeHours}
            />
        </div>
    )
}

Schedule.propTypes = {
    events: PropTypes.array.isRequired,
    officeHours: PropTypes.object.isRequired
};