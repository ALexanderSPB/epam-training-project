import React, {Component} from 'react';
import moment from 'moment';
import Select from '../../../common/ui/select';
import OfficeHoursBlock from './officeHoursBlock';
import * as formats from '../../../constants/dateTimeFormats';

const UI_TEXT = {
    rooms: 'Комнаты',
    add: 'Добавить',
    remove: 'Удалить',
    location: 'Здание'
};

class LocationsSection extends Component {
    locationInfo() {
        if (!this.props.location) return;

        const { name, address, timing, rooms } = this.props.location;
        const { isTimeEditing, startEditingTime, handleTimeChanged, handleRoomClick } = this.props;

        const formattedTime = {
            opening: moment(timing.opening, 'h').format(formats.hoursAndMinutes),
            closing: moment(timing.closing, 'h').format(formats.hoursAndMinutes)
        };

        return (
            <section>
                <h2>{name}</h2>
                <p>{address}</p>
                <OfficeHoursBlock
                    formattedTime={formattedTime}
                    isEditing={isTimeEditing}
                    startEditing={startEditingTime}
                    changeTime={handleTimeChanged}
                />
                <div>
                    <p>{UI_TEXT.rooms}</p>
                    <button>{UI_TEXT.add}</button>
                    <ul>
                        {rooms.map(room =>
                            <li
                                key={room.uuid}
                                onClick={() => handleRoomClick(room.uuid)}
                            >
                                {room.name}
                            </li>)}
                    </ul>
                </div>
                <button onClick={this.props}>{UI_TEXT.remove}</button>
            </section>
        )
    }

    render() {
        return (
            <section>
                <Select
                    options={this.props.locations}
                    labelText={UI_TEXT.location}
                    valueChanged={this.props.changeLocation}
                />
                {this.locationInfo()}
            </section>
        );
    }
}
