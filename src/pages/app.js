import React, {Component} from 'react';
import Header from '../common/parts/header/header';
import Footer from '../common/parts/footer/footer';
import './style.css';


class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
};

export default App;
