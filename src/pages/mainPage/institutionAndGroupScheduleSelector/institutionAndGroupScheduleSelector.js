import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../../common/ui/select';
import Shedule from '../../../schedule/schedule';
import {fetchEntities} from './fetchEntityActions';
import {PATHS} from '../../../constants/database';
import {INSTITUTIONS, GROUPS} from '../../../constants/fetchActionsTypes';
import Firebase from '../../../common/helpers/firebase';

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
        window.scrollTo(0 , document.body.offsetHeight);
    }

    render() {
        const {selectedInstitution, events} = this.state;
        const {institutions, groups} = this.props;

        let institutionInfo = institutions.find(x => x.uuid === selectedInstitution);

        return (
            <section className="row siteBody__searchSchedulePart">
                <div className="col-xs-10 col-xs-offset-1">
                    <div className="row searchSchedulePart__selectionPart">
                        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                            <Select
                                options={institutions}
                                valueChanged={this.handleSelectInstitution}
                                labelText="Выберите заведение"
                            />
                            { selectedInstitution
                                ? <Select
                                    options={groups[selectedInstitution] || []}
                                    valueChanged={this.handleSelectGroup}
                                    labelText="Выберите группу"
                                />
                                : null
                            }
                        </div>
                    </div>
                </div>
                { events !== undefined
                    ? <div className="row searchSchedulePart__schedulePart">
                        <div className="col-xs-12">
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
