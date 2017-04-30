import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../select';
import {fetchInstitutions} from './fetchInstitutionActions';

const mapStateToProps = state => ({'institutions': state.institutions});

const mapDispatchToProps = dispatch => ({
    fetchInstitutions: bindActionCreators(fetchInstitutions, dispatch),
    dispatch,
});

class SelectInstitution extends Component {
    componentDidMount() {
        this.props.fetchInstitutions();
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectInstitution);