import React, {PropTypes} from 'react';

function errorMessage(error, className) {
    if (error) {
        return (
            <span className={`${className}__error`}>
                {error}
            </span>
        )
    }
}

export default function Input({className, labelText, type, value, valueChanged, error}) {
    function handleChange(event) {
        valueChanged(event.target.value);
    }

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                {labelText}
                <input
                    className={`${className}__input`}
                    onChange={handleChange}
                    type={type}
                    value={value ? value : null}
                />
            </label>
            {errorMessage(error, className)}
        </div>
    )
}

Input.propTypes = {
    className: PropTypes.string.isRequired,
    error: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string
};