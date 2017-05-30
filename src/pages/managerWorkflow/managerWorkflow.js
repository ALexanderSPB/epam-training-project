import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {ROLE_MANAGER} from '../../constants/roles';
import './managerWorkflow.css';

const mapStateToProps = state => ({
    loginData: state.loginData,
});

class ManagerWorkflow extends Component {

    componentWillMount() {
        if (this.props.loginData.role !== ROLE_MANAGER) {
            browserHistory.push('/');
        }
    }

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
    loginData: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ManagerWorkflow);
