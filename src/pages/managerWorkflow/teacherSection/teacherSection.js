import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import TeacherCard from '../../managerWorkflow/teacherSection/teacherCard/teacherCard';
import {SKILLS, TEACHERS} from '../../../constants/fetchActionsTypes';
import {PATHS} from '../../../constants/database';

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
    }

    render() {
        const {teachers, skills} = this.props;
        return (
            <section className="row">
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
