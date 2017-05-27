import React, {Component, PropTypes} from 'react';
import Input from '../../../common/ui/input';
import {hoursAndMinutesRegExp} from '../../../constants/dateTimeFormats';

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
        if (!hoursAndMinutesRegExp.test(value)) {
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
        return (
            <div>
                <h3>{UI_TEXT.officeHours}</h3>
                {this.state.error ? <p>{this.state.error}</p> : null}
                <Input
                    labelText={UI_TEXT.opening}
                    value={this.state.formattedTime.opening}
                    valueChanged={(value) => this.handleChange(value, timeNames.opening)}
                />
                <Input
                    labelText={UI_TEXT.closing}
                    value={this.state.formattedTime.closing}
                    valueChanged={(value) => this.handleChange(value, timeNames.closing)}
                />
                <button disabled={!this.state.saveButtonEnabled} id="officeHoursBlock__SaveButton" onClick={this.handleSave.bind(this)}>{UI_TEXT.save}</button>
            </div>
        );
    }
}

OfficeHoursBlock.propTypes = {
    formattedTime: PropTypes.object.isRequired,
    error: PropTypes.string,
    saveTime: PropTypes.func
};
