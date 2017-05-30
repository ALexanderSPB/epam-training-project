import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const defaultClasses =  {
    wrapper: 'common-select',
    label: 'common-select__label col-xs-12 col-md-3',
    selectWrapper: 'col-xs-12 col-md-9'
};

export default function Select({classes = defaultClasses, labelText = '', valueChanged, options, selectId, multiple = false, selected = ''}) {
    function handleChange(event) {
        valueChanged(event.target.value);
    }
    const selectedOption = options.find(opt => (opt.name === selected || opt.uuid === selected));

    return (
        <div className={'container-fluid ' + classNames(classes.wrapper)}>
            <label className={classNames(classes.label)} htmlFor={selectId}>
                {labelText}
            </label>
            <div className={classNames(classes.selectWrapper)}>
                <select
                    className={classNames('form-control', classes.select)}
                    onChange={handleChange}
                    multiple={multiple}
                    value={selectedOption && (selectedOption.name || selectedOption.uuid)}
                >
                    <option hidden={true}/>
                    {options.map((option, index) => <option key={`${index}_${option.uuid || option.name}`}
                                                            value={option.uuid || option.name}>{option.name}</option>)}
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
    labelText: PropTypes.string,
    selected: PropTypes.string
};

