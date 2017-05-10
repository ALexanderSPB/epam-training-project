import React, {Component} from 'react';
import {Link} from 'react-router';
import './footer.css';

// TODO:!! прописать правильные ссылки, когда будут их адреса

class Footer extends Component {

    render() {
        return (
            <footer className="app-footer row">
                <ul className="app-footer__navigate-list">
                    <li className="navigate-list__list-item">
                        <Link to="/">
                            Главная
                        </Link>
                    </li>
                    <li className="navigate-list__list-item">
                        <Link to="/">
                            FAQ
                        </Link>
                    </li>
                </ul>
            </footer>
        );
    }
}

export default Footer;
