import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import TeacherCard from '../../managerWorkflow/teacherSection/teacherCard/teacherCard';
import {TEACHERS} from '../../../constants/fetchActionsTypes';
import {PATHS} from '../../../constants/database';
import Firebase from '../../../common/helpers/firebase';

const mapStateToProps = state => ({
    teachers: state.teachers,
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
        this.state = {};
        Firebase.get(skills)
            .then(skills => this.setState({skills}));
    }

    render() {
        const {teachers} = this.props;
        const {skills} = this.state;
        return (
            <section className="row">
                {
                    (skills === undefined) ? null :
                    teachers.map(teacher => ({...teacher, skills: teacher.skills.map(skillID => skills[skillID])}))
                        .map(teacher => <TeacherCard key={teacher.uuid} {...teacher}/>)}
            </section>
        );
    }
}

TeacherSection.propTypes = {
    fetchEntities: PropTypes.func,
    teachers: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSection);
