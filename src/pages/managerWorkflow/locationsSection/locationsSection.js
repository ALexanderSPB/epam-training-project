import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from '../../../common/ui/select';

class LocationsSection extends Component {
    constructor() {
        super();

        this.state = {
            selectedLocation: false
        }
    }

    set(value, field) {
        this.setState({ [field]: value });
    }

    locationInfo() {
        if (this.state.location) {
            return (
                <section>
                    <header>{/*name*/}</header>
                    <p>{/*address*/}</p>
                    <time dateTime={/*smth*/}>{/*time*/}</time>
                    {/*rooms*/}
                    <button>Удалить</button>
                </section>
            )
        }
    }

    render() {
        return (
            <section>
                <Select
                    options={[/*locations list*/]}
                />
                {this.locationInfo()}
            </section>
        );
    }
}
