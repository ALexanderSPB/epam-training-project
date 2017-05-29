import React from 'react';
import {browserHistory} from 'react-router';
import {ROUTE_PATHS} from '../../../constants/routes';
import './footer.css';

const Footer = () => {

    function goToPage(page) {
        browserHistory.push(page);
    }

    //noinspection JSMethodCanBeStatic
    return (
        <footer className="app-footer row">
            <div className="col-xs-12">
                <ul className="app-footer__navigate-list">
                    <li className="navigate-list__list-item">
                        <a onClick={() => goToPage(ROUTE_PATHS.root)}>
                            Home
                        </a>
                    </li>
                    <li className="navigate-list__list-item">
                        <a onClick={() => goToPage(ROUTE_PATHS.faq)}>
                            FAQ
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
