import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default function Input({inputId, classes, placeholder, labelText, type, value, valueChanged, error}) {
    function handleChange(event) {
        valueChanged(event.target.value);
    }

    function errorMessage(error, classes) {
        if (error) {
            return (
                <span className={classNames(classes)}>
                {error}
            </span>
            )
        }
    }

    return (
        <div className={classNames('form-group', classes.wrapper)}>
            <label className={classNames('label-control', classes.label)} htmlFor={inputId}>
                {labelText}
            </label>
            <div className={classNames(classes.inputWrapper)}>
                <input
                    id={inputId}
                    className={classNames('form-control', classes.input)}
                    placeholder={placeholder}
                    onChange={handleChange}
                    type={type}
                    value={value ? value : null}
                />
            </div>
            {errorMessage(error, classes.error)}
        </div>
    )
}

Input.propTypes = {
    classes: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string
};