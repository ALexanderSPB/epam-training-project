import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default function Select({classes, labelText = "", valueChanged, options, selectId, multiple}) {
    function handleChange(event) {
        valueChanged(event.target.value);
    }

    return (
        <div className={classNames(classes.wrapper)}>
            <label className={classNames(classes.label)} htmlFor={selectId}>
                {labelText}
            </label>
            <div className={classNames(classes.selectWrapper)}>
                <select
                    className={classNames('form-control', classes.select)}
                    onChange={handleChange}
                    multiple={multiple}
                >
                    <option disabled={true} selected={true} hidden={true}></option>
                    {options.map(option => <option key={option.uuid} value={option.name}>{option.name}</option>)}
                </select>
            </div>
        </div>
    )
}

Select.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    multiple: PropTypes.bool,
    labelText: PropTypes.string
};