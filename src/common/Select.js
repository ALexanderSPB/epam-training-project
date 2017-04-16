import React, {PropTypes} from 'react';

export default function Select({className, labelText, valueChanged, options}) {
    let select;

    function handleChange(event) {
        valueChanged(event.target.value);
    }

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                {labelText}
                <select
                    className={`${className}__select`}
                    onChange={handleChange}
                >
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </label>
        </div>
    )
}

Select.propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
};