import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import Firebase from '../../../../common/helpers/firebase';
import {bindActionCreators} from 'redux';
import {fetchEntities} from '../../../../constants/fetchEntityActions';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';

const mapStateToProps = state => ({
    institution : state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class AddRoomModal extends Component {

    saveRoom() {
        const {room, reference} = this.state;
        Firebase.set(reference, room);
    }

    render() {
        return (
            <Modal
                openButtonTitle="Add room"
                footerButtons={[{text: 'save', type: 'success', onClick: this.saveRoom.bind(this)}]}
            >
                <div>
                    <Input
                        inputId="name"
                        labelText="Name:"
                        placeholder="Enter name here"
                        type="text"
                        valueChanged={e => this.setState({name: e.target.value})}
                    />
                    <Input
                        inputId="capacity"
                        labelText="Capacity:"
                        placeholder="Enter capacity here"
                        type="number"
                        valueChanged={e => this.setState({capacity: e.target.value})}
                    />
                </div>
            </Modal>
        );
    }
}

AddRoomModal.propTypes = {
    fetchEntities: PropTypes.func.isRequired,
    institution: PropTypes.string.isRequired,
    locationId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomModal);
