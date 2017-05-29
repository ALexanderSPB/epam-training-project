import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
// import OfficeHoursBlock from './officeHoursBlock';
// import * as formats from '../../../constants/dateTimeFormats';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {LOCATIONS} from '../../../constants/fetchActionsTypes';
import EditRoomModal from './modals/editRoom';
import DeleteLocationModal from './modals/deleteLocationModal';

const UI_TEXT = {
    rooms: 'Rooms',
    add: 'Add',
    location: 'Location'
};

const mapStateToProps = state => ({
    institution: state.loginData.institution,
    locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class LocationsSection extends Component {
    constructor(props) {
        super(props);
        this.changeLocation = this.changeLocation.bind(this);
        this.state = {selectedLocation: ''};
    }

    componentWillMount() {
        this.props.fetchEntities(`${PATHS.locations}/${this.props.institution}`, LOCATIONS);
    }

    changeLocation(selected) {
        this.setState({selectedLocation: selected});
    }

    locationInfo() {
        const {locations, institution} = this.props;
        const {selectedLocation} = this.state;
        if (selectedLocation === '') return;

        let locationId = '';
        const {name, address, /*timing,*/ rooms} = locations.find((loc, id)=> {
            locationId = id;
            return loc.name === selectedLocation;
        });

        return (
            <section>
                <h2>{name}</h2>
                <p>{address}</p>
                <div>
                    <p>{UI_TEXT.rooms}</p>
                    <button>{UI_TEXT.add}</button>
                    <ul>
                        {rooms.map((room, id) =>
                            <li key={`${id}_${room.name}`} className="room">
                                <span>name: {room.name}, capacity: {room.capacity}</span>
                                <EditRoomModal room={room}
                                               institution={institution}
                                               reference={`${PATHS.locations}${institution}/${locationId}/rooms/${id}`}
                                />
                            </li>)}
                    </ul>
                </div>
                {/*<button onClick={this.props}>{UI_TEXT.add}</button>*/}
                <DeleteLocationModal institution={institution} locationId={locationId} />
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
    changeLocation: PropTypes.func,
    handleTimeChanged: PropTypes.func,
    handleRoomClick: PropTypes.func,
    location: PropTypes.object,
    locations: PropTypes.array,
    institution: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSection);
