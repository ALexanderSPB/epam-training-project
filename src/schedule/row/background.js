import React, { PropTypes } from 'react';

export default function Background({cellHeight, numOfCells}) {
    let rows = [];
    for (let i = 0; i < numOfCells; i++) {
        rows[i] = i;
    }

    return (
        <table className="bg-table">
            <tbody>
            {rows.map((row) =>
                <tr className="bg-row" style={{height: cellHeight + 'px'}}>
                    <td/>
                </tr>
            )}
            </tbody>
        </table>
    )
}

Background.propTypes = {
    cellHeight: PropTypes.number.isRequired,
    numOfCells: PropTypes.number.isRequired
};