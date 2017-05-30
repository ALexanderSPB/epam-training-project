import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import Input from '../../../common/ui/input';
import * as formats from '../../../constants/dateTimeFormats';

const UI_TEXT = {
    opening: 'Opening',
    closing: 'Closing',
    officeHours: 'Office hours:',
    save: 'Save'
};

const timeNames = {
    opening: 'opening',
    closing: 'closing'
};

export default class OfficeHoursBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveButtonEnabled: true,
            formattedTime: this.props.formattedTime
        };
    }

    handleChange(value, partOfTime) {
        if (!moment(value, formats.hoursAndMinutes).isValid()) {
            this.setState({error: `Incorrect time format in ${partOfTime} time, please use HH:MM format`});
            return;
        }

        this.setState({
            error: null,
            formattedTime: {
                ...this.state.formattedTime,
                [partOfTime]: value
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formattedTime !== this.props.formattedTime) {
            this.setState({formattedTime: nextProps.formattedTime});
        }

        this.setState({saveButtonEnabled: true});
    }

    handleSave() {
        this.setState({saveButtonEnabled: false});
        this.props.saveTime(this.state.formattedTime);
    }

    render() {
        const {error, formattedTime, saveButtonEnabled} = this.state;
        return (
            <div>
                <h3>{UI_TEXT.officeHours}</h3>
                {error ? <p>{error}</p> : null}
                <Input
                    labelText={UI_TEXT.opening}
                    value={formattedTime.opening}
                    valueChanged={(value) => this.handleChange(value, timeNames.opening)}
                />
                <Input
                    labelText={UI_TEXT.closing}
                    value={formattedTime.closing}
                    valueChanged={(value) => this.handleChange(value, timeNames.closing)}
                />
                <button
                    disabled={!saveButtonEnabled}
                    id="officeHoursBlock__SaveButton"
                    onClick={this.handleSave.bind(this)}
                >
                    {UI_TEXT.save}
                </button>
            </div>
        );
    }
}

OfficeHoursBlock.propTypes = {
    formattedTime: PropTypes.object.isRequired,
    error: PropTypes.string,
    saveTime: PropTypes.func
};
