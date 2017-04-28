import React, {Component} from "react";

const getTeacherSchedule = (events) => (teacher) => {
    return events.filter(event => event.teacher.uuid === teacher.uuid)
};

const mapStateToProps = (state) => ({
    events: getTeacherSchedule(state.event)
});

const mapDispatchToProps = (dispatch) => ({

});

export default class WorkflowTeacher extends Component {
    render() {
        return (
            <div>
                <Schedule
                    {...props}
                />
            </div>
        )
    }
}