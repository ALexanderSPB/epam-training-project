import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import EditHoursBlock from './editHoursBlock';
import * as formats from '../../../constants/dateTimeFormats';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {saveTime} from './locationActions';
import {PATHS} from '../../../constants/database';
import {LOCATIONS} from '../../../constants/fetchActionsTypes';
import EditRoomModal from './modals/editRoom';
import DeleteLocationModal from './modals/deleteLocationModal';
import AddLocationModal from './modals/addLocation';
import AddRoomModal from './modals/addRoom';
import {fillHolesIn} from '../../../common/helpers/arrays';

const UI_TEXT = {
    rooms: 'Rooms',
    addLocation: 'Add location',
    location: 'Location'
};

const mapStateToProps = state => ({
    institutionId: state.loginData.institution,
    locations: state.locations
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    saveTime: bindActionCreators(saveTime, dispatch),
    dispatch,
});

class LocationsSection extends Component {
    constructor(props) {
        super(props);
        this.changeLocation = this.changeLocation.bind(this);
        this.state = {selectedLocation: ''};
    }

    componentWillMount() {
        this.props.fetchEntities(`${PATHS.locations}/${this.props.institutionId}`, LOCATIONS);
    }

    changeLocation(selected) {
        this.setState({selectedLocation: selected});
    }

    locationInfo() {
        const {selectedLocation} = this.state;
        if (selectedLocation === '') return;

        const {locations, institutionId} = this.props;
        let firstLocation = locations[0].name;

        let locationId = '';

        const {name, address, timing, rooms = []} = locations.find((loc, id) => {
            locationId = id;
            return loc.name === selectedLocation;
        });
        const filledRooms = fillHolesIn(rooms);

        const formattedTime = {
            opening: moment(timing.opening, 'h').format(formats.hoursAndMinutes),
            closing: moment(timing.closing, 'h').format(formats.hoursAndMinutes)
        };

        return (
            <section>
                <h2>{name}</h2>
                <p>{address}</p>
                <EditHoursBlock
                    formattedTime={formattedTime}
                />
                <div>
                    <p>{UI_TEXT.rooms}</p>
                    <AddRoomModal
                        rooms={filledRooms}
                        locationId={locationId}
                        institutionId={institutionId}
                    />
                    <ul>
                        {filledRooms.map((room, id) =>
                            room === null ? null : <li
                                className="room"
                                key={`${id}_${room.name}`}
                            >
                                <span>name: {room.name}, capacity: {room.capacity}</span>
                                <EditRoomModal
                                    room={room}
                                    institution={institutionId}
                                    reference={`${PATHS.locations}${institutionId}/${locationId}/rooms/${id}`}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                {/*<button onClick={this.props}>{UI_TEXT.add}</button>*/}
                <DeleteLocationModal
                    institutionId={institutionId}
                    locationId={locationId}
                    firstLocation={firstLocation}
                    redirectTo={(location) => this.setState({selectedLocation: location})}
                />
            </section>
        );
    }

    render() {

        let filledLocations = fillHolesIn(this.props.locations);

        return (
            <section className="col-xs-9">
                <Select
                    options={filledLocations}
                    labelText={UI_TEXT.location}
                    valueChanged={this.changeLocation}
                    selected={this.state.selectedLocation}
                />
                {this.locationInfo()}
                <AddLocationModal
                    institutionId={this.props.institutionId}
                    reference={`${PATHS.locations}${this.props.institutionId}`}
                    redirectTo={(location) => this.setState({selectedLocation: location})}
                />
            </section>
        );
    }
}

LocationsSection.propTypes = {
    fetchEntities: PropTypes.func.isRequired,
    institutionId: PropTypes.string.isRequired,
    saveTime: PropTypes.func,
    locations: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSection);
