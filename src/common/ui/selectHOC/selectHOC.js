import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../select';
import {fetchGroups} from './selectGroup/fetchGroupActions';
import {fetchInstitutions} from './selectInstitution/fetchInstitutionActions';

const mapStateToProps = state => ({
    'institutions': state.institutions,
    'groups': state.groups,
});

const mapDispatchToProps = dispatch => ({
    fetchGroups: bindActionCreators(fetchGroups, dispatch),
    fetchInstitutions: bindActionCreators(fetchInstitutions, dispatch),
    dispatch,
});

class SelectHOC extends Component {
    constructor(props) {
        super(props);
        this.handleSelectInstitution = this.handleSelectInstitution.bind(this);
        this.handleSelectGroup = this.handleSelectGroup.bind(this);

        this.state = {
            selectedInstitution: '',
            selectedGroup: '',
        };
    }

    componentDidMount() {
        this.props.fetchInstitutions();
        this.props.fetchGroups();
    }

    handleSelectInstitution(selected) {
        this.setState(Object.assign(this.state, {selectedInstitution: selected}))
    }

    handleSelectGroup(selected) {
        this.setState(Object.assign(this.state, {selectedGroup: selected}))
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectHOC)