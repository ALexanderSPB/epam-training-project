import React, {PropTypes} from 'react';
import ErrorMessage from './errorMessage';

export default function Select({className, labelText, valueChanged, options, error}) {
    let select;

    function handleChange(event) {
        valueChanged(event.target.value);
    }

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                <select
                    className={`${className}__select`}
                    onChange={handleChange}
                >
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                {labelText}
            </label>
            {error && <ErrorMessage className={className} error={error}/>}
        </div>
    )
}

Select.propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    error: PropTypes.string,
};