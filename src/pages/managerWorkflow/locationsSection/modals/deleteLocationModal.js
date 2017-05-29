import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Modal from '../../../../common/ui/modal/modalComponent';
import {deleteLocation} from './deleteLocationAction';
import {connect} from 'react-redux';

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
    institution: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    deleteLocation: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLocationModal);
