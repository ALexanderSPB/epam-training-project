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
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.props.fetchInstitutions();
    }

    handleSelect(selectedValue) {
        this.setState({
            selectedValue,
        });
    }

    render() {
        return (
            <Select
                options={this.props.institutions}
                valueChanged={this.handleSelect}
                classes={{}}
                multiple={false}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectInstitution);