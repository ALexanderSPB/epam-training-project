import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../select';
import {fetchEntity} from './fetchEntityActions';
import {PATHS} from '../../../constants/database';
import * as fetchActions from '../../../constants/fetchActionsTypes';


const mapStateToProps = state => ({
    'institutions': state.institutions,
    'groups': state.groups,
});

const mapDispatchToProps = dispatch => ({
    fetchEntity: bindActionCreators(fetchEntity, dispatch),
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
        const {INSTITUTIONS, GROUPS} = fetchActions;
        this.props.fetchEntity(PATHS.institutions, INSTITUTIONS);
        this.props.fetchEntity(PATHS.groups, GROUPS);
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
        console.log(Date.now(), this.props);
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