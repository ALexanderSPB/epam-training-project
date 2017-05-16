import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import OfficeHoursBlock from './officeHoursBlock';
import * as formats from '../../../constants/dateTimeFormats';
import {locationsRequest} from './locationsActions';

const UI_TEXT = {
    rooms: 'Rooms',
    add: 'Add',
    remove: 'Remove',
    location: 'Location'
};

const institutionId = 'inst0'; //TODO: replace this temporary constant after institution info is stored somewhere

const mapStateToProps = state => ({
    locations: state.locationsSection.locations
});

const mapDispatchToProps = dispatch => ({
    locationsRequest: bindActionCreators(locationsRequest, dispatch),
    dispatch,
});

class LocationsSection extends Component {

    componentWillMount() {
        this.props.locationsRequest(institutionId);
    }

    locationInfo() {
        if (!this.props.location) return;

        const { name, address, timing, rooms } = this.props.location;
        const { handleTimeChanged, handleRoomClick } = this.props;

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
                <button onClick={this.props}>{UI_TEXT.add}</button>
                <button onClick={this.props}>{UI_TEXT.remove}</button>
            </section>
        );
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

LocationsSection.propTypes = {
    locationsRequest: PropTypes.func.isRequired,
    changeLocation: PropTypes.func,
    handleTimeChanged: PropTypes.func,
    handleRoomClick:  PropTypes.func,
    location: PropTypes.object,
    locations: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSection);
