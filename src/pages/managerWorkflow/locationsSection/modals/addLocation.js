import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../../../common/ui/modal/modalComponent';
import {save} from './addLocationActions';
import * as formats from '../../../../constants/dateTimeFormats';
import Input from '../../../../common/ui/input';
import OfficeHoursBlock from '../officeHoursBlock';

const mapStateToProps = state => ({
    institution: state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    save: bindActionCreators(save, dispatch),
    dispatch,
});

class AddLocationModal extends Component {

    saveLocation() {
        const {address, name, time} = this.state;
        this.props.save({address, name, time}, this.props.institution);
    }

    render() {
        const formattedTime = {
            opening: moment(timing.opening, 'h').format(formats.hoursAndMinutes),
            closing: moment(timing.closing, 'h').format(formats.hoursAndMinutes)
        };

        return (
            <Modal
                openButtonTitle="Add location"
                footerButtons={[{text: 'save', type: 'success', onClick: this.saveLocation.bind(this)}]}
            >
                <div>
                    <Input
                        labelText="Address:"
                        valueChanged={e => this.setState({address: e.target.value})}
                    />
                    <Input
                        labelText="Name:"
                        valueChanged={e => this.setState({name: e.target.value})}
                    />
                    <OfficeHoursBlock
                        formattedTime={formattedTime}
                        labelText="Office hours:"
                        valueChanged={e => this.setState({name: e.target.value})}
                    />
                </div>
            </Modal>
        );
    }
}

AddLocationModal.propTypes = {
    save: PropTypes.func.isRequired,
    institution: PropTypes.string.isRequired,
    //locationId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
