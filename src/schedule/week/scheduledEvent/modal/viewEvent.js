import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import Modal from '../../../../common/ui/modal/modalComponent';
import Record from '../../../../common/ui/record';
import * as formats from '../../../../constants/dateTimeFormats';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const classes = {
    label: 'col-xs-5',
    wrapper: 'col-xs-8',
    text: 'col-xs-5'
};

class ViewEvent extends Component {

    render() {
        return (
            <Modal
                openButtonTitle="view"
                title="Event Inforamation"
                footerButtons={[{
                    text: "Cancel this event",
                    type: 'danger',
                    onClick: this.props.cancelFunction 
                }]}
            >
                <div className="row">
                    <form className="form-horizontal">
                        <Record classes={classes} text={this.props.name} label="Name"/>
                        <Record classes={classes} text={moment(this.props.beginning).format(formats.eventBeginning)} label="Beginning"/>
                        <Record classes={classes} text={this.props.teacher} label="Teacher"/>
                        <Record classes={classes} text={this.props.location} label="Location"/>
                        <Record classes={classes} text={this.props.room} label="Room"/>
                    </form>
                </div>
            </Modal>
        );
    };
}

ViewEvent.propTypes = {
    name: PropTypes.string,
    beginning: PropTypes.object,
    teacher: PropTypes.string,
    location: PropTypes.string,
    room: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
