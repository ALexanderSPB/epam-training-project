import Firebase from '../../../common/helpers/firebase';
import {PATHS} from '../../../constants/database';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {TEACHERS} from '../../../constants/fetchActionsTypes';

export const saveTeacher = (data, teacher, skills) => dispatch => {
    let skillList = data.teacherSkills ? data.teacherSkills : teacher.skills;
    const teacherData = {...teacher,
        name: data.name || teacher.name,
        email: data.email || teacher.email,
        location: data.location || teacher.location,
        skills: skillList.map(skill => skills.indexOf(skill))
    };
    Firebase.set(`${PATHS.users}${teacher.uuid}/`, teacherData)
        .then(dispatch(fetchEntities(PATHS.users, TEACHERS)));
};
