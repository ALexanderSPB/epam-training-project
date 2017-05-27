import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import Firebase from '../../../../common/helpers/firebase';
import {bindActionCreators} from 'redux';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {connect} from 'react-redux';
import {LOCATIONS} from '../../../../constants/fetchActionsTypes';
import {PATHS} from '../../../../constants/database';


const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class EditRoomModal extends Component {
    constructor(props) {
        super(props);
        const {room, reference} = props;
        this.state = {
            room,
            reference
        };
        this.saveRoom = this.saveRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
    }

    static createButton(text, type, onClick) {
        return {
            text, type, onClick
        };
    }

    modalButtons() {
        return [
            EditRoomModal.createButton('save', 'success', this.saveRoom),
            EditRoomModal.createButton('remove', 'danger', this.removeRoom),
        ];
    }

    fetchLocations() {
        this.props.fetchEntities(`${PATHS.locations}/${this.props.institution}`, LOCATIONS);
    }

    saveRoom() {
        const {room, reference} = this.state;
        Firebase.set(reference, room).then(this.fetchLocations);
    }

    removeRoom() {
        const {reference} = this.state;
        Firebase.set(reference, null).then(this.fetchLocations);
    }

    modalChild() {
        const {room} = this.state;
        return (
            <div>
                <label htmlFor="name">Name:
                    <input type="text" name="name" value={room.name}
                           onChange={e => this.setState({room: {...room, name: e.target.value}})}
                    />
                </label>
                <label htmlFor="capacity">Capacity:
                    <input type="number" name="capacity" value={room.capacity}
                           onChange={e => this.setState({room: {...room, capacity: e.target.value}})}/>
                </label>
            </div>
        );
    }

    render() {
        const {room} = this.state;
        return (
            <Modal
                openButtonTitle={<span className="glyphicon glyphicon-pencil"/>}
                title={`Edit ${room.name}`}
                children={this.modalChild()}
                footerButtons={this.modalButtons()}
            />
        );
    }
}

EditRoomModal.propTypes = {
    room: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    institution: PropTypes.string,
    fetchEntities: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(EditRoomModal);
