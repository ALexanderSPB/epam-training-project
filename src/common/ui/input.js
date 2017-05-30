import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Input({classes = {}, placeholder, labelText, type, valueChanged, defaultValue, value, error, handleBlur}) {
    function handleChange(event) {
        if (handleBlur && event.type === 'blur') {
            handleBlur(event.target.value);
            return;
        }
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
            {labelText
                ? <label className={classNames('control-label', classes.label)} htmlFor={labelText}>
                    {labelText}
                </label>
                : null}
            <div className={classNames(classes.inputWrapper)}>
                <input
                    id={labelText}
                    defaultValue={defaultValue}
                    className={classNames('form-control', classes.input, classes.hasError)}
                    placeholder={placeholder}
                    onBlur={handleChange}
                    onChange={handleChange}
                    type={type ? type : 'text'}
                    value={value}
                />
            </div>
            {errorMessage(error, classes.error)}
        </div>
    );
}

Input.propTypes = {
    valueChanged: PropTypes.func.isRequired,
    classes: PropTypes.object,
    error: PropTypes.string,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    handleBlur: PropTypes.func,
};
