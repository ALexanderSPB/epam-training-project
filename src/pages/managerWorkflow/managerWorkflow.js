import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './managerWorkflow.css';

export default class ManagerWorkflow extends Component {
    render() {
        const {sidebar, workflow} = this.props;
        return (
            <div className="container-fluid manager-workflow">
                {sidebar}
                {workflow}
            </div>
        );
    }
}

ManagerWorkflow.propTypes = {
    sidebar: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
};

