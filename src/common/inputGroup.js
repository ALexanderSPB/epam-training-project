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

export default function InputGroup({className, labelText, type, value, valueChanged, error}) {
    let input;

    function handleChange() {
        valueChanged(input.value);
    }

    return (
        <div className={className}>
            <label className={`${className}__label`}>
                <input
                    className={`${className}__input`}
                    onChange={handleChange}
                    ref={node => input = node}
                    type={type}
                    value={value ? value : null}
                />
                {labelText}
            </label>
            {errorMessage(error, className)}
        </div>
    )
}

InputGroup.propTypes = {
    className: PropTypes.string.isRequired,
    error: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string
};