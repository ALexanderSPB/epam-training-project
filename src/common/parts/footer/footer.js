import React, {Component} from 'react';
import {Link} from 'react-router';
import './footer.css';

// !! прописать правильные ссылки, когда будут их адреса

class Footer extends Component {

    render() {
        return (
            <footer className="app_footer row">
                <ul className="app_footer_content">
                    <li className="list-item">
                        <Link to="/">
                            Главная
                        </Link>
                    </li>
                    <li className="list-item">
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
