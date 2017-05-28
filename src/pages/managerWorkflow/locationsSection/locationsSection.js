import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import OfficeHoursBlock from './officeHoursBlock';
import * as formats from '../../../constants/dateTimeFormats';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {locationsRequest, saveTime, selectLocation} from './locationsActions';
import {PATHS} from '../../../constants/database';
import {LOCATIONS} from '../../../constants/fetchActionsTypes';
import EditRoomModal from './modals/editRoom';

const UI_TEXT = {
    rooms: 'Rooms',
    add: 'Add',
    remove: 'Remove',
    location: 'Location'
};

const mapStateToProps = state => ({
    institutionId: state.loginData.institution,
    locations: state.locations.locations,
    location: state.locations.selectedLocation
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    locationsRequest: bindActionCreators(locationsRequest, dispatch),
    changeLocation: bindActionCreators(selectLocation, dispatch),
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
        this.props.locationsRequest(this.props.institutionId);
        this.props.fetchEntities(`${PATHS.locations}/${this.props.institution}`, LOCATIONS);
    }

    changeLocation(selected) {
        this.setState({selectedLocation: selected});
    }

    locationInfo() {
        if (!this.props.location) return;

        const {locations, institution} = this.props;
        const {selectedLocation} = this.state;
        if (selectedLocation === '') return;

        let locationId = '';
        const {name, address, /*timing,*/ rooms} = locations.find((loc, id)=> {
            locationId = id;
            return loc.name === selectedLocation;
        });

        const { name, address, timing, rooms } = this.props.location.data;
        const { institutionId, handleRoomClick } = this.props;

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
                    saveTime={(time) => this.props.saveTime(time, institutionId, this.props.location.id)}
                />
                <div>
                    <p>{UI_TEXT.rooms}</p>
                    <button>{UI_TEXT.add}</button>
                    <ul>
                        {rooms.map((room, id) =>
                            <li
                                className="room"
                                key={`${id}_${room.name}`}
                                onClick={() => handleRoomClick(id)}
                            >
                                <span>name: {room.name}, capacity: {room.capacity}</span>
                                <EditRoomModal room={room}
                                               institution={institutionId}
                                               reference={`${PATHS.locations}${institutionId}/${locationId}/rooms/${id}`}
                                />
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
            <section className="col-xs-6">
                <Select
                    options={this.props.locations}
                    labelText={UI_TEXT.location}
                    valueChanged={this.changeLocation}
                />
                {this.locationInfo()}
            </section>
        );
    }
}

LocationsSection.propTypes = {
    fetchEntities: PropTypes.func.isRequired,
    institutionId: PropTypes.string.isRequired,
    locationsRequest: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
    saveTime: PropTypes.func,
    handleRoomClick:  PropTypes.func,
    location: PropTypes.object,
    locations: PropTypes.array,
    institution: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSection);
