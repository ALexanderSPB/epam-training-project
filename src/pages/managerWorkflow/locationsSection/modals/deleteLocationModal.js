import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Modal from '../../../../common/ui/modal/modalComponent';
import {deleteLocation} from './deleteLocationAction';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    institution: state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    deleteLocation: bindActionCreators(deleteLocation, dispatch),
    dispatch,
});

class DeleteLocationModal extends Component {

    deleteCurrentLocation(redirectTo) {
        const {institutionId, locationId, firstLocation, deleteLocation} = this.props;
        deleteLocation(institutionId, locationId, firstLocation, redirectTo);
    }

    render() {
        return (
            <Modal
                title="Please, confirm your decision"
                openButtonTitle="Delete location"
                footerButtons={[
                    {
                        text: 'Delete',
                        type: 'danger',
                        onClick: () => this.deleteCurrentLocation(this.props.redirectTo(this.props.firstLocation))
                    },
                    {
                        text: 'Cancel',
                        type: 'default',
                        onClick: () => {}
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
    institutionId: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    firstLocation: PropTypes.string,
    redirectTo: PropTypes.func,
    deleteLocation: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLocationModal);
