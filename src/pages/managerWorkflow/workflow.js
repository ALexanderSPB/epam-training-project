import React from 'react';
import PropTypes from 'prop-types';


const Workflow = (props) => <h1 className="col-xs-offset-5">{props.route.path}</h1>;

Workflow.propTypes = {
    route: PropTypes.object.isRequired,
};

export default Workflow;
