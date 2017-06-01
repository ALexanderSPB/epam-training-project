import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../../common/ui/select';
import Shedule from '../../../schedule/schedule';
import {fetchEntities} from '../../../constants/fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {INSTITUTIONS, GROUPS} from '../../../constants/fetchActionsTypes';
import Firebase from '../../../common/helpers/firebase';
import {scheduleCellHeight} from '../../../constants/scheduleOptions';

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
        this.setState({institutionInfo: this.props.institutions.find(x => x.uuid === selected)});
    }

    handleSelectGroup(selected) {
        this.setState({selectedGroup: selected},
            this.getEvents.bind(this)
        );
    }

    getEvents() {
        const {selectedInstitution, selectedGroup} = this.state;
        Firebase.getEventsByGroup(selectedInstitution, selectedGroup)
            .then(events => this.setState({events}));
    }

    //noinspection JSMethodCanBeStatic
    componentDidUpdate() {
        if (this.state.events === undefined)
            return;
        const {timing} = this.state.institutionInfo;
        let scheduleHeight = (timing.closing - timing.opening + 5) * scheduleCellHeight;
        window.scrollTo(0 , document.body.offsetHeight - scheduleHeight);
    }

    render() {
        const {selectedInstitution, events, institutionInfo} = this.state;
        const {institutions, groups} = this.props;

        return (
            <section className="siteBody__searchSchedulePart">
                <div className="searchSchedulePart__selectionPart">
                    <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                        <Select
                            options={institutions}
                            valueChanged={this.handleSelectInstitution}
                            labelText="Choose the institution: "
                        />
                        { selectedInstitution
                            ? <Select
                            options={groups[selectedInstitution] || []}
                            valueChanged={this.handleSelectGroup}
                            labelText="Choose the group: "
                        />
                            : null
                        }
                    </div>
                </div>
                { events !== undefined
                    ? <div className="searchSchedulePart__schedulePart">
                        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                            <Shedule
                                events={events}
                                officeHours={institutionInfo.timing}
                            />
                        </div>
                    </div>
                    : null
                }
            </section>
        );
    }
}

InstitutionAndGroupScheduleSelector.propTypes = {
    fetchEntities: PropTypes.func.isRequired,
    institutions: PropTypes.array,
    groups: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionAndGroupScheduleSelector);
