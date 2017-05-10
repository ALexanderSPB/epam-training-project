import React from 'react';
import {browserHistory} from 'react-router';
import {ROUTE_PATHS} from '../../../constants/routes';

const Footer = () => {

    function goToPage(page) {
        browserHistory.push(page);
    }

    return(
        <footer className="app_footer">
            <ul className="app_footer_content">
                <li>
                    <a onClick={() => goToPage(ROUTE_PATHS.root)}>
                        Главная
                    </a>
                </li>
                <li>
                    <a onClick={() => goToPage(ROUTE_PATHS.faq)}>
                        FAQ
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
