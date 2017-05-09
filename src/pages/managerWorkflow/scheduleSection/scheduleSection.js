import React, { Component } from 'react';
import moment from 'moment';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';
import * as formats from '../../../constants/dateTimeFormats';

const UI_TEXT = {
    addEvent: 'Добавить занятие',
    sortBy: 'Sort by',
    sortOptions: {
        group: 'group',
        teacher: 'teacher'
    }
};

class ScheduleSection extends Component {

    render() {
        const { sortBy } = this.props;

        return (
            <section>
                <Select
                    options={}
                />
                <Select options=""/>
                <Select options=""/>
                <Schedule/>
                <button>{UI_TEXT.addEvent}</button>
            </section>
        );
    }
}