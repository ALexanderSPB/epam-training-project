import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../common/ui/modal/modalComponent';
import {connect} from 'react-redux';
import Input from '../../../../common/ui/input';
import Select from '../../../../common/ui/select';

const mapStateToProps = state => ({
    locations: state.locations,
    skills: state.skills,
});

class TeacherCardEditModal extends Component {
    saveData() {
        this.props.save(this.state);
    }

    render() {
        const {locations, selectedLocation, skills, name, email} = this.props;
        return (
            <Modal
                openButtonTitle="Edit teacher data"
                footerButtons={[{text: 'save', type: 'success', onClick: this.saveData.bind(this)}]}
            >
                <div>
                    <Input
                        labelText="Name"
                        valueChanged={v => this.setState({name: v})}
                        defaultValue={name}
                    />
                    <Input
                        labelText="Email"
                        valueChanged={v => this.setState({email: v})}
                        defaultValue={email}
                    />
                    <Select
                        options={locations}
                        valueChanged={ v => this.setState({location: v}) }
                        labelText="Location"
                        selected={selectedLocation}
                    />
                    <Select
                        options={skills}
                        valueChanged={ v => this.setState({teacherSkills: v}) }
                        labelText="Skills"
                        multiple={true}
                    />
                </div>
            </Modal>
        );
    }
}

TeacherCardEditModal.propTypes = {
    locations: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    email: PropTypes.string,
    name: PropTypes.string,
    selectedLocation: PropTypes.string,
    teacherSkills: PropTypes.array
};

export default connect(mapStateToProps)(TeacherCardEditModal);
