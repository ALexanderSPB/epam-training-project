import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { ROUTE_PATHS } from '../../../constants/routes';

class Footer extends Component {

    linkToHomepage() {
        browserHistory.push(ROUTE_PATHS.root);
    }

    linkToFAQ() {
        browserHistory.push(ROUTE_PATHS.faq);
    }

    render() {
        return(
            <footer className="app_footer">
                <ul className="app_footer_content">
                    <li>
                        <a onClick={this.linkToHomepage}>
                            Главная
                        </a>
                    </li>
                    <li>
                        <a onClick={this.linkToFAQ}>
                            FAQ
                        </a>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
