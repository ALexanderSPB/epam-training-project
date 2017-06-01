import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Modal from '../../../../common/ui/modal/modalComponent';
import {save} from './addLocationActions';
import * as formats from '../../../../constants/dateTimeFormats';
import Input from '../../../../common/ui/input';
import EditHoursBlock from '../editHoursBlock';
import {saveTime} from '../locationActions';

const mapStateToProps = state => ({
    locations: state.locations,
});

const mapDispatchToProps = dispatch => ({
    save: bindActionCreators(save, dispatch),
    saveTime: bindActionCreators(saveTime, dispatch),
    dispatch,
});

class AddLocationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {timing: {opening: 9, closing: 20}};
        this.saveLocation = this.saveLocation.bind(this);
    }

    saveLocation(redirectTo) {
        const {locations, save, reference} = this.props;
        const {address, name, timing} = this.state;
        save([...locations, {address, name, timing}], reference, redirectTo);
    }

    render() {
        const {timing, name} = this.state;

        const formattedTime = {
            opening: moment(timing.opening, 'h').format(formats.hoursAndMinutes),
            closing: moment(timing.closing, 'h').format(formats.hoursAndMinutes)
        };

        return (
            <Modal
                openButtonTitle="Add location"
                footerButtons={[{
                    text: 'save',
                    type: 'success',
                    onClick: () => this.saveLocation(() => this.props.redirectTo(name))
                }]}
            >
                <div>
                    <Input
                        labelText="Address:"
                        valueChanged={value => this.setState({address: value})}
                    />
                    <Input
                        labelText="Name:"
                        valueChanged={value => this.setState({name: value})}
                    />
                    <EditHoursBlock
                        formattedTime={formattedTime}
                        labelText="Office hours:"
                        saveTime={(time) => this.setState({timing: time})}
                    />
                </div>
            </Modal>
        );
    }
}

AddLocationModal.propTypes = {
    reference: PropTypes.string.isRequired,
    save: PropTypes.func,
    saveTime: PropTypes.func,
    locations: PropTypes.array,
    redirectTo: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
