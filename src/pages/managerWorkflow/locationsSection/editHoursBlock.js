import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

export default class EditHoursBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveButtonEnabled: true,
            formattedTime: this.props.formattedTime
        };
        this.handleSave = this.handleSave.bind(this);
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
        this.props.saveTime(this.state.formattedTime);
    }

    render() {
        const {error, formattedTime} = this.state;
        return (
            <div>
                <h3>{UI_TEXT.officeHours}</h3>
                {error ? <p>{error}</p> : null}
                <Input
                    labelText={UI_TEXT.opening}
                    value={formattedTime.opening}
                    valueChanged={(value) => this.handleChange(value, timeNames.opening)}
                    handleBlur={this.handleSave}
                />
                <Input
                    labelText={UI_TEXT.closing}
                    value={formattedTime.closing}
                    valueChanged={(value) => this.handleChange(value, timeNames.closing)}
                    handleBlur={this.handleSave}
                />
            </div>
        );
    }
}

EditHoursBlock.propTypes = {
    formattedTime: PropTypes.object.isRequired,
    error: PropTypes.string,
    saveTime: PropTypes.func
};
