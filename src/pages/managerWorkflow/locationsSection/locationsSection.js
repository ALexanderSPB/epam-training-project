import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Select from '../../../common/ui/select';
import OfficeHoursBlock from './officeHoursBlock';
import * as formats from '../../../constants/dateTimeFormats';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {INSTITUTIONS, LOCATIONS} from '../../../constants/fetchActionsTypes';
import EditRoomModal from './modals/editRoom';
import Firebase from '../../../common/helpers/firebase';

const UI_TEXT = {
    rooms: 'Rooms',
    add: 'Add',
    remove: 'Remove',
    location: 'Location',
    institution: 'Institution'
};

// const institutionId = 'inst0'; //TODO: replace this temporary constant after institution info is stored somewhere

const mapStateToProps = state => ({
    locations: state.locations,
    institutions: state.institutions,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class LocationsSection extends Component {
    constructor(props) {
        super(props);
        this.changeInstitution = this.changeInstitution.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.state = {};
    }

    componentWillMount() {
        // Firebase.set('locations/inst0/0', JSON.parse(`{"address":"Some address","name":"Office 1","rooms":[{"capacity":"20","name":"1"},{"capacity":"10","name":"12a"}],"timing":{"closing":22,"opening":8}}`));
        this.props.fetchEntities(PATHS.institutions, INSTITUTIONS);
    }

    changeInstitution(selected) {
        this.setState({selectedInstitution: selected}, () => this.props.fetchEntities(`${PATHS.locations}/${selected}`, LOCATIONS));
    }

    changeLocation(selected) {
        this.setState({selectedLocation: selected});
    }

    locationInfo() {
        console.log(this.state);
        const {locations} = this.props;
        const {selectedLocation} = this.state;
        if (!selectedLocation) return;

        let locationId = '';
        const {name, address, timing, rooms} = locations.find((loc, id)=> {
            locationId = id;
            return loc.name === selectedLocation;
        });
        // const {handleTimeChanged, handleRoomClick} = this.props;
        //
        // const formattedTime = {
        //     opening: moment(timing.opening, 'h').format(formats.hoursAndMinutes),
        //     closing: moment(timing.closing, 'h').format(formats.hoursAndMinutes)
        // };

        return (
            <section>
                <h2>{name}</h2>
                <p>{address}</p>
                {/*<OfficeHoursBlock*/}
                    {/*formattedTime={formattedTime}*/}
                    {/*changeTime={handleTimeChanged}*/}
                {/*/>*/}
                <div>
                    <p>{UI_TEXT.rooms}</p>
                    <button>{UI_TEXT.add}</button>
                    <ul>
                        {rooms.map((room, id) =>
                            <li key={id}>
                                {room.name}<EditRoomModal room={room} reference={`${PATHS.locations}${this.state.selectedInstitution}/${locationId}/rooms/${id}`}/>
                            </li>)}

                    </ul>
                </div>
                {/*<button onClick={this.props}>{UI_TEXT.add}</button>*/}
                {/*<button onClick={this.props}>{UI_TEXT.remove}</button>*/}
            </section>
        );
    }

    render() {
        return (
            <section>
                <Select
                    options={this.props.institutions}
                    labelText={UI_TEXT.institution}
                    valueChanged={this.changeInstitution}
                />
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
    institutions: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSection);
