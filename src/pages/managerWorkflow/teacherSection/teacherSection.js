import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import TeacherCard from '../../managerWorkflow/teacherSection/teacherCard/teacherCard';
import {SKILLS, TEACHERS} from '../../../constants/fetchActionsTypes';
import {PATHS} from '../../../constants/database';
import Input from '../../../common/ui/input';

const mapStateToProps = state => ({
    teachers: state.teachers,
    skills: state.skills,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class TeacherSection extends Component {
    constructor(props) {
        super(props);
        const {users, skills} = PATHS;
        props.fetchEntities(users, TEACHERS);
        props.fetchEntities(skills, SKILLS);
        this.state = {partToFind: ''};
    }

    filteredTeachers() {
        if (this.state.partToFind === '')
            return this.props.teachers;
        return this.props.teachers.filter(teacher => (teacher.name.toLowerCase().indexOf(this.state.partToFind) + 1));
    }

    setFilter(subString) {
        this.setState({partToFind: subString.toLowerCase()});
    }

    render() {
        const {skills} = this.props;
        let teachers = this.filteredTeachers.call(this);

        return (
            <section className="row">
                <Input
                    placeholder="Find..."
                    valueChanged={this.setFilter.bind(this)}
                />
                {
                    (teachers === undefined || skills === undefined)
                        ? null
                        : teachers.map(teacher => ({...teacher, skills: teacher.skills.map(skillID => skills[skillID])}))
                            .map(teacher => <TeacherCard key={teacher.uuid} {...teacher}/>)
                }
            </section>
        );
    }
}

TeacherSection.propTypes = {
    fetchEntities: PropTypes.func,
    teachers: PropTypes.array,
    skills: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSection);
