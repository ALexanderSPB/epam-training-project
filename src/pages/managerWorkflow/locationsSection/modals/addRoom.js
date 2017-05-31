import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import {bindActionCreators} from 'redux';
import {save} from './addRoomActions';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';

const mapDispatchToProps = dispatch => ({
    save: bindActionCreators(save, dispatch),
    dispatch,
});

class AddRoomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.saveRoom = this.saveRoom.bind(this);
    }

    saveRoom() {
        const {name, capacity} = this.state;
        const {save, institutionId, rooms, locationId} = this.props;
        save([...rooms, {name, capacity}], institutionId, locationId);
    }

    render() {
        return (
            <Modal
                openButtonTitle="Add room"
                footerButtons={[{text: 'save', type: 'success', onClick: this.saveRoom}]}
            >
                <div>
                    <Input
                        labelText="Name:"
                        valueChanged={value => this.setState({name: value})}
                    />
                    <Input
                        labelText="Capacity:"
                        type="number"
                        valueChanged={value => this.setState({capacity: value})}
                    />
                </div>
            </Modal>
        );
    }
}

AddRoomModal.propTypes = {
    rooms: PropTypes.array.isRequired,
    locationId: PropTypes.number.isRequired,
    save: PropTypes.func,
    institutionId: PropTypes.string,
};

export default connect(null, mapDispatchToProps)(AddRoomModal);
