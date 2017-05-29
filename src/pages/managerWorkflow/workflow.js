import React from 'react';
import PropTypes from 'prop-types';
import ScheduleSection from './scheduleSection/scheduleSection';
import Locations from './locationsSection/locationsSection';
import TeacherSection from './teacherSection/teacherSection';

const checkPath = (path) => {
    switch(path) {
        case 'schedule' :
            return <ScheduleSection/>;
        case 'location':
            return <Locations/>;
        case 'teacher':
            return <TeacherSection/>;
        default :
            return <h1>{path}</h1>;
    }
};

const Workflow = (props) => <section className="col-xs-8">
                                { checkPath(props.route.path) }
                            </section>;

Workflow.propTypes = {
    route: PropTypes.object.isRequired,
};

export default Workflow;
