import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Select from "../../common/ui/select";
import * as fetchActions from "./fetchActions";

const mapStateToProps = state => ({'institutions': state.institutions});

const mapDispatchToProps = dispatch => ({
    fetchActions: bindActionCreators(fetchActions, dispatch),
    dispatch,
});

class DropdownMenu extends Component {
    componentDidMount() {
        const {fetchActions} = this.props;
        fetchActions.fetchInstitutions();
    }

    render() {
        return (
            <Select options={this.props.institutions} valueChanged={console.log}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);