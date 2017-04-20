import React, { PropTypes } from 'react';

export default function Cell({name, teacher, location, room, top, height}) {
    return (
        <div style={{
            top : top + 'px',
            position: 'absolute',
            height: height + 'px'
        }}>
            <p>{name}</p>
            <p>{teacher}</p>
            <p>{`${room}, ${location}`}</p>
        </div>
    )
}

Cell.propTypes = {
    height: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired
};