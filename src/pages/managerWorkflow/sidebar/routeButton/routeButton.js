import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const RouteButton = ({name}) => (
    <button>
        <Link to={'/manager/' + name}>{name}</Link>
    </button>
);

RouteButton.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RouteButton;
