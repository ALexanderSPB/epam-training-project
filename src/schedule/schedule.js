import React from 'react';
import { daysOfWeek } from './../constants';
import Row from './row/row';
import './schedule.css';

export default function Schedule(props) {
        return (
        <table className="table table-bordered table-condensed schedule">
            <thead>
                <tr>
                    <th>time</th>
                    {daysOfWeek.map((day) => //generating head of "table"
                        <th key={day}>
                            <p className="text-center">
                                {day}
                            </p>
                        </th>
                    )}
                </tr>
            </thead>
            <Row
                {...props}
            />
        </table>
    )
}