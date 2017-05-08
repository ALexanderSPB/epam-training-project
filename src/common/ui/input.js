import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Input({inputId, classes, placeholder, labelText, type, valueChanged, error}) {
    function handleChange(event) {
        valueChanged(event.target.value);
    }

    function errorMessage(error, errorClasses) {
        if (error) {
            return (
                <span className={classNames(errorClasses)}>
                    {error}
                </span>
            );
        }
    }

    return (
        <div className={classNames('form-group', classes.wrapper)}>
            <label className={classNames('control-label', classes.label)} htmlFor={inputId}>
                {labelText}
            </label>
            <div className={classNames(classes.inputWrapper)}>
                <input
                    id={inputId}
                    className={classNames('form-control', classes.input, classes.hasError)}
                    placeholder={placeholder}
                    onChange={handleChange}
                    type={type}
                />
            </div>
            {errorMessage(error, classes.error)}
        </div>
    );
}

Input.propTypes = {
    inputId: PropTypes.number.isRequired,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    valueChanged: PropTypes.func.isRequired,
    classes: PropTypes.object,
    error: PropTypes.string,
    value: PropTypes.string
};
