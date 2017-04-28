import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../../common/ui/select';
import * as fetchInstitutionActions from './fetchInstitutionActions';

const mapStateToProps = state => ({'institutions': state.institutions});

const mapDispatchToProps = dispatch => ({
    fetchInstitutionActions: bindActionCreators(fetchInstitutionActions, dispatch),
    dispatch,
});

class DropdownMenu extends Component {
    componentDidMount() {
        const {fetchInstitutionActions} = this.props;
        fetchInstitutionActions.fetchInstitutions();
    }

    render() {
        return (
            <Select
                options={this.props.institutions}
                valueChanged={console.log}
                classes={{}}
                multiple={false}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);