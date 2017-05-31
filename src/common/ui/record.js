import React from 'react';
import PropTypes from 'prop-types';

export default function Record({classes = {}, label, text}) {
    return (
        <div className={classes.wrapper}>
            <label className={classes.label}>
                {label}
            </label>
            <span className={classes.span}>
                {text}
            </span>
        </div>
    );
}

Record.PropTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    text: PropTypes.string
}
