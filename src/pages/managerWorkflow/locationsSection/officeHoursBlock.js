import React, {PropTypes} from 'react';
import Input from '../../../common/ui/input';

const UI_TEXT = {
    opening: 'Opening',
    closing: 'Closing',
    formatOfTime: 'Format: HH:MM',
    officeHours: 'Office hours:',
    save: 'Save'
};

export default function OfficeHoursBlock({formattedTime, error, changeTime}) {
    const timeNames = {
        opening: 'opening',
        closing: 'closing'
    };

    function handleChange(value, partOfTime) {
        changeTime({
            ...formattedTime,
            [partOfTime]: value
        });
    }

    return (
        <div>
            <h3>{UI_TEXT.officeHours}</h3>
            {error ? <p>{error}</p> : null}
            <Input
                labelText={UI_TEXT.opening}
                placeholder={UI_TEXT.formatOfTime}
                type="text"
                defaultValue={formattedTime.opening}
                valueChanged={(value) => handleChange(value, timeNames.opening)}
            />
            <Input
                labelText={UI_TEXT.closing}
                placeholder={UI_TEXT.formatOfTime}
                type="text"
                defaultValue={formattedTime.closing}
                valueChanged={(value) => handleChange(value, timeNames.closing)}
            />
            <button>{UI_TEXT.save}</button>
        </div>
    );
}

OfficeHoursBlock.propTypes = {
    formattedTime: PropTypes.object.isRequired,
    error: PropTypes.string,
    changeTime: PropTypes.func
};
