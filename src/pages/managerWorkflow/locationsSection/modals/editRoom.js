import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {removeRoom, saveRoom} from '../locationActions';

const mapDispatchToProps = dispatch => ({
    saveRoom: bindActionCreators(saveRoom, dispatch),
    removeRoom: bindActionCreators(removeRoom, dispatch),
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
    }

    static createButton(text, type, onClick) {
        return {
            text, type, onClick
        };
    }

    modalButtons() {
        const {institution, saveRoom, removeRoom} = this.props;
        const {room, reference} = this.state;
        return [
            EditRoomModal.createButton('save', 'success', () => saveRoom(room, reference, institution)),
            EditRoomModal.createButton('remove', 'danger', () => removeRoom(reference, institution)),
        ];
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
    saveRoom: PropTypes.func,
    removeRoom: PropTypes.func,
    fetchEntities: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(EditRoomModal);
