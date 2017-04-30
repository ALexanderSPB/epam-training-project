import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../select';
import {fetchGroups} from './fetchGroupActions';

const mapStateToProps = state => ({'groups': state.groups});

const mapDispatchToProps = dispatch => ({
    fetchGroups: bindActionCreators(fetchGroups, dispatch),
    dispatch,
});

class SelectGroup extends Component {
    componentDidMount() {
        this.props.fetchGroups();
    }

    render() {
        return (
            <Select
                options={this.props.groups}
                valueChanged={console.log}
                classes={{}}
                multiple={false}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGroup);