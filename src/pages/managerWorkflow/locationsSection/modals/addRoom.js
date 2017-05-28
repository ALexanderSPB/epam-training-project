import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import {bindActionCreators} from 'redux';
import {save} from './addRoomActions';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';

const mapStateToProps = state => ({
    institution : state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    save: bindActionCreators(save, dispatch),
    dispatch,
});

class AddRoomModal extends Component {

    saveRoom() {
        const {name, capacity} = this.state;
        this.props.save({name, capacity}, this.props.institution, this.props.locationId);
    }

    render() {
        return (
            <Modal
                openButtonTitle="Add room"
                footerButtons={[{text: 'save', type: 'success', onClick: this.saveRoom.bind(this)}]}
            >
                <div>
                    <Input
                        labelText="Name:"
                        valueChanged={e => this.setState({name: e.target.value})}
                    />
                    <Input
                        labelText="Capacity:"
                        type="number"
                        valueChanged={e => this.setState({capacity: e.target.value})}
                    />
                </div>
            </Modal>
        );
    }
}

AddRoomModal.propTypes = {
    save: PropTypes.func.isRequired,
    institution: PropTypes.string.isRequired,
    locationId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomModal);
