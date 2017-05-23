import React from 'react';
import PropTypes from 'prop-types';


const Workflow = (props) => <section className="col-xs-8"><h1>{props.route.path}</h1></section>;

Workflow.propTypes = {
    route: PropTypes.object.isRequired,
};

export default Workflow;
