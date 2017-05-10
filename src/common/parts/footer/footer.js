import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {ROUTE_PATHS} from '../../../constants/routes';

class Footer extends Component {

    goToPage(page) {
        browserHistory.push(page);
    }

    render() {
        return(
            <footer className="app_footer">
                <ul className="app_footer_content">
                    <li>
                        <a onClick={() => this.goToPage(ROUTE_PATHS.root)}>
                            Главная
                        </a>
                    </li>
                    <li>
                        <a onClick={() => this.goToPage(ROUTE_PATHS.faq)}>
                            FAQ
                        </a>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
