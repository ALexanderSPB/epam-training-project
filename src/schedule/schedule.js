import React from 'react';
import { daysOfWeek } from './../constants';
import Week from './week/week';
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
            <Week
                {...props}
            />
        </table>
    )
}