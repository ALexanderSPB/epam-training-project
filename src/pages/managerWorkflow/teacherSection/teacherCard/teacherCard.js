import React from 'react';
import PropTypes from 'prop-types';

const TeacherCard = ({name, institution, location, email, skills}) => {
    return (
        <div className="col-xs-5 col-xs-offset-4 card-wrapper">
            <div className="panel panel-info teacherCard">
                <div className="panel-heading">
                    <h3 className="panel-title">{name}</h3>
                </div>
                <div className="panel-body">
                    <ul>
                        <li>institution: {institution}</li>
                        <li>location: {location}</li>
                        <li>email: {email}</li>
                        <li>skills: {skills.join(', ')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

TeacherCard.propTypes = {
    name: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
    location: PropTypes.object,
};

export default TeacherCard;
