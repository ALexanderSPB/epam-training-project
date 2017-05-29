import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Select({classes = {}, labelText = '', valueChanged, options, selectId, multiple = false}) {
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
                    <option hidden={true}/>
                    {options.map((option, index) => <option key={`${index}_${option.uuid}`}
                                                            value={option.uuid}>{option.name}</option>)}
                </select>
            </div>
        </div>
    );
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    valueChanged: PropTypes.func.isRequired,
    selectId: PropTypes.number,
    classes: PropTypes.object,
    multiple: PropTypes.bool,
    labelText: PropTypes.string
};
