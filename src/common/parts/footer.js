import React, { Component } from 'react';
import { Link } from 'react-router';

// !! прописать правильные ссылки, когда будут их адреса

class Footer extends Component {

    render() {
        return(
            <footer className="app_footer">
                <ul className="app_footer_content">
                    <li>
                        <Link to="/">
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            FAQ
                        </Link>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
