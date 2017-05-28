import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';
import Select from '../../../../common/ui/select';
import Modal from '../../../../common/ui/modal/modalComponent';
import {save} from './editEventActions';

const UI_TEXT = {
    name: 'Event name',
    beginning: 'Start time',
    duration: 'Duration',
    teacher: 'Teacher',
    location: 'Location',
    room: 'Room',
    group: 'Group',
    edit: 'Edit',
    editEvent: 'Edit event',
    save: 'Save'
};

const mapStateToProps = state => ({
    institution: state.loginData.institution,
    events: state.schedule.events,
    lists: state.schedule.lists
});

const classes = {
    label: 'col-xs-3 col-sm-2',
    inputWrapper: 'col-xs-8 col-sm-9'
};

const mapDispatchToProps = dispatch => ({
    save: bindActionCreators(save, dispatch),
    dispatch,
});

class EditEvent extends Component {

    set(value, field) {
        this.setState({[field]: value});
    }

    handleSave() {
        const {uuid, name, timing, teacher, location, group, room} = this.state;

        let event = {
            location: {
                uuid: this.props.lists.locations.findIndex(l => l.name === location.name),
                name: location.name
            },
            group: {
                uuid: group.uuid,
                name: this.props.lists.groups.find(g => g.uuid === group.uuid)
            },
            timing,
            teacher,
            uuid,
            name,
            room
        };
        this.props.save(event, this.props.institution, this.state.currentEventIndex);
    }

    componentWillMount() {
        if (this.props.uuid) {
            const eventIndex = this.props.events.findIndex( event => event.uuid === this.props.uuid );
            this.setState({currentEventIndex: eventIndex});
            this.setState(this.props.events[eventIndex]);
        }
        else {
            this.setState({
                uuid: 'test',
                timing: {},
                teacher: {},
                location: {},
                group: {}
            });
        }
    }

    render() {
        const { teachers, locations, groups } = this.props.lists;

        function rooms() {
            if (!this.state.location)
                return;
            const locationInfo = locations.find( l => l.name === this.state.location);
            if (!locationInfo)
                return;
            return (<Select
                options={locationInfo.rooms}
                valueChanged={ v => this.setState({'room': v}) }
                labelText={UI_TEXT.room}
            />);
        }

        return (
            <Modal
                openButtonTitle={UI_TEXT.edit}
                title={UI_TEXT.editEvent}
                footerButtons={[{
                    text: UI_TEXT.save,
                    type: 'success',
                    onClick: this.handleSave.bind(this)
                }]}
            >
                <div className="container-fluid">
                    <Input
                        classes={classes}
                        labelText={UI_TEXT.name}
                        valueChanged={ v => this.setState({'name': v}) }
                        defaultValue={this.state.name}
                    />
                    <Input
                        classes={classes}
                        labelText={UI_TEXT.beginning}
                        valueChanged={ v => this.setState({'beginning': v}) }
                        defaultValue={this.state.timing.beginning + ''}
                    />
                    <Input
                        classes={classes}
                        labelText={UI_TEXT.duration}
                        valueChanged={ v => this.setState({'duration': v}) }
                        defaultValue={this.state.timing.duration + ''}
                    />
                    <Select
                        options={teachers}
                        valueChanged={ v => this.setState({'teacher': {'name': v}}) }
                        labelText={UI_TEXT.teacher}
                    />
                    <Select
                        options={locations}
                        valueChanged={ v => this.setState({'location': {'name': v}}) }
                        labelText={UI_TEXT.location}
                    />
                    {rooms.call(this)}
                    <Select
                        options={groups}
                        valueChanged={ v => this.setState({'group': {'uuid': v}}) }
                        labelText={UI_TEXT.group}
                    />
                </div>
            </Modal>
        );
    }
}

EditEvent.propTypes = {
    lists: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    institution: PropTypes.string.isRequired,
    uuid: PropTypes.string,
    events: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
