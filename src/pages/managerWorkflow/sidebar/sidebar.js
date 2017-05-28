import React from 'react';
import RouteButton from './routeButton/routeButton';
import './sidebar.css';

const Sidebar = () => {
    const sideRoutes = ['location', 'teacher', 'schedule'];
    return (
        <section className="col-xs-3 sidebar">
            <ul>
                {sideRoutes.map((route, index) => <li key={index}> <RouteButton name={route}/> </li>)}
            </ul>
        </section>
    );
};

export default Sidebar;
