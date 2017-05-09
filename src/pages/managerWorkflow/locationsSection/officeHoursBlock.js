import React, {PropTypes} from 'react';
import Input from '../../../common/ui/input';

export default function OfficeHoursBlock({isEditing, formattedTime, error, changeTime, startEditing}) {
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

    if (isEditing) {
        return (
            <div>
                <p>Время работы:</p>
                <time dateTime={formattedTime.opening}>{formattedTime.opening}</time>
                <time dateTime={formattedTime.closing}>{formattedTime.closing}</time>
                <button onClick={startEditing}>Редактировать</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>Время работы:</p>
                {error ? <p>{error}</p> : null}
                <Input
                    labelText="Начало"
                    placeholder="Время в формате HH:MM"
                    type="text"
                    valueChanged={(value) => handleChange(value, timeNames.opening)}
                />
                <Input
                    labelText="Окончание"
                    placeholder="Время в формате HH:MM"
                    type="text"
                    valueChanged={(value) => handleChange(value, timeNames.closing)}
                />
            </div>
        )
    }
}

OfficeHoursBlock.propTypes = {
    formattedTime: PropTypes.object.isRequired,
    isEditing: PropTypes.bool,
    error: PropTypes.string,
    changeTime: PropTypes.func,
    startEditing: PropTypes.func
};