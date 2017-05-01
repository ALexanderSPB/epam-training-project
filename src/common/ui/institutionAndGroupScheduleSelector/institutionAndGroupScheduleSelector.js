import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../select';
import {fetchEntities} from './fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {INSTITUTIONS, GROUPS} from '../../../constants/fetchActionsTypes';

const mapStateToProps = state => ({
    'institutions': state.institutions,
    'groups': state.groups,
});

const mapDispatchToProps = dispatch => ({
    fetchEntities: bindActionCreators(fetchEntities, dispatch),
    dispatch,
});

class InstitutionAndGroupScheduleSelector extends Component {
    constructor(props) {
        super(props);
        this.handleSelectInstitution = this.handleSelectInstitution.bind(this);
        this.handleSelectGroup = this.handleSelectGroup.bind(this);

        this.state = {
            selectedInstitution: '',
            selectedGroup: '',
        };
        const {institutions, groups} = PATHS;
        props.fetchEntities(institutions, INSTITUTIONS);
        props.fetchEntities(groups, GROUPS);
    }

    handleSelectInstitution(selected) {
        this.setState({selectedInstitution: selected});
    }

    handleSelectGroup(selected) {
        this.setState({selectedGroup: selected});
    }

    render() {
        const {selectedInstitution} = this.state;
        const {institutions, groups} = this.props;
        return (
            <div>
                <Select
                    options={institutions}
                    valueChanged={this.handleSelectInstitution}
                    classes={{}}
                    multiple={false}
                />
                <Select
                    options={groups[selectedInstitution] || []}
                    valueChanged={this.handleSelectGroup}
                    classes={{}}
                    multiple={false}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionAndGroupScheduleSelector)