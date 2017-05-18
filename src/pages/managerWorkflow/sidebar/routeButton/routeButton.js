import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {ROUTE_PATHS} from '../../../../constants/routes';

const RouteButton = ({name}) => (
    <button>
        <Link to={`/${ROUTE_PATHS.manager}/${name}`}>{name}</Link>
    </button>
);

RouteButton.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RouteButton;
