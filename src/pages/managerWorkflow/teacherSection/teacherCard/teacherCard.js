import React from 'react';

const TeacherCard = (teacher) => {
    const {name, institution, location, email, skills} = teacher;
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
export default TeacherCard;
