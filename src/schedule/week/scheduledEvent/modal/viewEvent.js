import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {cancel} from './viewEventActions';
import moment from 'moment';
import Modal from '../../../../common/ui/modal/modalComponent';
import Record from '../../../../common/ui/record';
import * as formats from '../../../../constants/dateTimeFormats';

const mapStateToProps = state => ({
    institution: state.loginData.institution
});

const mapDispatchToProps = dispatch => ({
    cancel: bindActionCreators(cancel, dispatch)
});

const classes = {
    label: 'col-xs-5',
    wrapper: 'col-xs-8',
    text: 'col-xs-5'
};

class ViewEvent extends Component {

    handleClick() {
        const {uuid, name, beginning, duration, teacher, teacherId, location, locationId, group, room} = this.props;

        let event = {
            location: {
                uuid: locationId,
                name: location
            },
            timing: {
                beginning,
                duration
            },
            teacher: {
                name: teacher,
                uuid: teacherId
            },
            uuid, name, room, group,
            isActive: false
        };
       this.props.cancel(event, this.props.institution);
    }

    render() {
        const {name, beginning, duration, group, teacher, location, room} = this.props;
        return (
            <Modal
                openButtonTitle="view"
                title="Event Inforamation"
                footerButtons={[{
                    text: 'Cancel this event',
                    type: 'danger',
                    onClick: this.handleClick.bind(this)
                }]}
            >
                <div className="row">
                    <form className="form-horizontal">
                        <Record classes={classes} text={name} label="Name"/>
                        <Record classes={classes} text={moment(beginning).format(formats.eventBeginning)} label="Beginning"/>
                        <Record classes={classes} text={duration} label="Duration"/>
                        <Record classes={classes} text={group.name} label="Group"/>
                        <Record classes={classes} text={teacher} label="Teacher"/>
                        <Record classes={classes} text={location} label="Location"/>
                        <Record classes={classes} text={room} label="Room"/>
                    </form>
                </div>
            </Modal>
        );
    };
}

ViewEvent.propTypes = {
    uuid: PropTypes.string,
    name: PropTypes.string,
    beginning: PropTypes.object,
    teacher: PropTypes.string,
    teacherId: PropTypes.string,
    location: PropTypes.string,
    locationId: PropTypes.number,
    room: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
