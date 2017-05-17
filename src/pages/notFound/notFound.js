import React from 'react';
import {Link} from 'react-router';
import {ROUTE_PATHS} from '../../constants/routes';
import notFoundErrorImg from '../../../public/img/404.png';
import './notFound.css';

const NotFound = () => {

    return (
        <div className="row siteBody siteBody--notFound text-center">
            <div className="col-xs-12">
                <img className="notFound__mainImg img-responsive center-block" src={notFoundErrorImg} alt="Page not found" />
                <h2>Page not found</h2>
                <p className="notFound__text">
                    We are sorry but the page you are looking for does not exist.<br/>
                    Please check the correctness of the entered link or <Link to={ROUTE_PATHS.root}>return</Link> to the homepage.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
