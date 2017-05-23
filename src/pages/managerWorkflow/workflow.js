import React from 'react';
import PropTypes from 'prop-types';
import ScheduleSection from './scheduleSection/scheduleSection';


const Workflow = (props) => <section className="col-xs-8">
                                {props.route.path === 'schedule' ?
                                    <ScheduleSection/> :
                                    <h1>{props.route.path}</h1>}
                            </section>;

Workflow.propTypes = {
    route: PropTypes.object.isRequired,
};

export default Workflow;
