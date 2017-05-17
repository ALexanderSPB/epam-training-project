import React from 'react';
import RouteButton from './routeButton/routeButton';

const Sidebar = () => {
    const sideRoutes = ['location', 'edit-teacher', 'schedule'];
    return (
        <section className="col-xs-4 col-xs-offset-1">
            <ul>
                {sideRoutes.map((route, index) => <li key={index}> <RouteButton name={route}/> </li>)}
            </ul>
        </section>
    );
};

export default Sidebar;
