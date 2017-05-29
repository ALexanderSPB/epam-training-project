import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import {bindActionCreators} from 'redux';
import {deleteLocation} from './deleteLocationAction';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';

const mapStateToProps = state => ({
    institution : state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    deleteLocation: bindActionCreators(deleteLocation, dispatch),
    dispatch,
});

class DeleteLocationModal extends Component {

    deleteCurrentLocation() {
        this.props.deleteLocation(this.props.institution, this.props.locationId);
    }

    render() {
        return (
            <Modal
                title="Please, confirm your decision"
                openButtonTitle="Delete"
                footerButtons={[
                    {
                        text: 'Delete',
                        type: 'danger',
                        onClick: this.deleteCurrentLocation.bind(this)
                    },
                    {
                        text: 'Cancel',
                        type: 'default',
                        onClick: () => {console.log('Canceled');}
                    }
                ]}
            >
                <p>
                    Do you really want to remove this location?
                    The changes will be irreversible
                </p>
            </Modal>
        );
    }
}

DeleteLocationModal.propTypes = {
    deleteLocation: PropTypes.func.isRequired,
    institution: PropTypes.string.isRequired,
    locationId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLocationModal);
