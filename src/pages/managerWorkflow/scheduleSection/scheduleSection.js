import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from '../../../common/ui/select';
import Schedule from '../../../schedule/schedule';

const UI_TEXT = {
    addEvent: 'Добавить занятие',
    sortBy: 'Сортировать по',
    select: ['Выберите группу', 'Выберите преподавателя']
};

export const SORT_EVENTS_OPTIONS = [
    {
        uuid: 0,
        name: 'группы'
    },
    {
        uuid: 1,
        name: 'преподаватели'
    }
];

// eslint-disable-next-line no-unused-vars
class ScheduleSection extends Component {

    render() {
        const { changeSortType, sortBy, secondSelectOptions, getEvents, events, createEvent, institutionTiming } = this.props;

        return (
            <section>
                <Select
                    labelText={UI_TEXT.sortBy}
                    options={SORT_EVENTS_OPTIONS}
                    valueChanged={changeSortType}
                />
                { sortBy !== undefined
                    ? <Select
                        labelText={UI_TEXT.select[sortBy]}
                        options={secondSelectOptions}
                        valueChanged={getEvents}
                    />
                    : null
                }
                { events !== undefined
                    ? <Schedule
                        events={events}
                        officeHours={institutionTiming}
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
    events: PropTypes.array,
    getEvents: PropTypes.func,
    institutionTiming: PropTypes.object,
    secondSelectOptions: PropTypes.array,
    sortBy: PropTypes.oneOf([SORT_EVENTS_OPTIONS[0].uuid, SORT_EVENTS_OPTIONS[1].uuid])
};
