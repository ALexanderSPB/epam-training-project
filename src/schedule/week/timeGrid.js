import React, { PropTypes } from 'react';

export default function TimeGrid({cellHeight, numOfCells}) {
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

TimeGrid.propTypes = {
    cellHeight: PropTypes.number.isRequired,
    numOfCells: PropTypes.number.isRequired
};