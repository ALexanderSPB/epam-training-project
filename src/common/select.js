import React, { PropTypes } from 'react';

function errorMessage(error, className) {
    if (error) {
        return (
            <span className={`${className}__error`}>
                {error}
            </span>
        )
    }
}

export default function Select({className, labelText, valueChanged, options, error}) {
    let select;

    function handleChange() {
        valueChanged(select.options[select.selectedIndex].value);
    }

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                <select
                    className={`${className}__select`}
                    onChange={handleChange}
                    ref={node => select = node}
                >
                    {options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                {labelText}
            </label>
            {errorMessage(error, className)}
        </div>
    )
}

Select.propTypes = {
    className: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    error: PropTypes.string,
};