import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import Firebase from '../../../../common/helpers/firebase';

export default class EditRoomModal extends Component {
    constructor(props) {
        super(props);
        const {room, reference} = props;
        this.state = {
            room,
            reference
        };
        this.saveRoom = this.saveRoom.bind(this);
        this.removeRoom = this.removeRoom.bind(this);
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

    saveRoom() {
        const {room, reference} = this.state;
        console.log(room, reference);
        Firebase.set(reference, room);
    }

    removeRoom() {
        const {reference} = this.state;
        // Firebase.set(reference, null);
        console.log(reference);
    }

    modalChild() {
        const {room} = this.state;
        return (
            <div>
                <label htmlFor="name">Name:
                    <input type="text" name="name" value={room.name}
                           onChange={e => this.setState({room: {...room, name: e.target.value}})}/>
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
                openButtonTitle='Edit'
                title={`Edit ${room.name}`}
                children={this.modalChild()}
                footerButtons={this.modalButtons()}
            />
        );
    }
}

EditRoomModal.propTypes = {
    room: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired
};
