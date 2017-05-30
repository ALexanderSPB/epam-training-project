import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from '../../common/ui/input';
import Select from '../../common/ui/select';
import Loader from '../../common/ui/loader/loader'
import './registrationPage.css';
import * as registrationActions from './registrationPageActions';

class RegistrationPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            name: '',
            surname: '',
            password: '',
            location: '',
            emailError: '',
            nameError: '',
            passwordError: ''
        };

        this.handleClick = (e) => {
            e.preventDefault();
            let error = false;
            let emailError, nameError, passwordError;
            if (!this.isValidEmail(this.state.email)) {
                error = true;
                emailError = 'Invalid E-Mail';
            } else {
                emailError = '';
            }
            if (this.state.name.length === 0) {
                error = true;
                nameError = 'Name is required';
            } else {
                nameError = '';
            }
            if (this.state.password.length < 7) {
                error = true;
                passwordError = 'Need > 6 symbols';
            } else {
                passwordError = '';
            }

            this.setState({emailError, nameError, passwordError});

            if (error) return;

            const {email, password, name, surname, location} = this.state;

            this.props.registrationActions.registrationSubmit({
                name: name + ' ' + surname,
                email,
                password,
                location
            });
        };
    }

    componentDidMount() {
        this.props.registrationActions.registrationGetLocations();
    }

    isValidEmail(email) {
        let r = /^[\w.\d-_]+@[\w.\d-_]+\.\w{2,4}$/i;
        return r.test(email);

    }

    handleChange(value, field) {
        this.setState({[field]: value});
    }

    render() {
        return (
            this.props.isLoading
                ? <Loader/>
                : <section className="registration row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <form className="registration__form form-horizontal">
                        <Input
                            classes={{
                                label: 'col-xs-2 registrationForm__label',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: 'registrationForm__input'
                            }}
                            valueChanged={ v => this.handleChange(v, 'email') }
                            inputId="registrationPageInput0"
                            placeholder="email@smth.com"
                            labelText="E-mail"
                            type="text"
                            error={this.state.emailError}
                        />
                        <Input
                            classes={{
                                label: 'col-xs-2 registrationForm__label',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: 'registrationForm__input'
                            }}
                            valueChanged={ v => this.handleChange(v, 'password') }
                            inputId="registrationPageInput1"
                            placeholder="Type password"
                            labelText="Password"
                            type="password"
                            error={this.state.passwordError}
                        />
                        <Input
                            classes={{
                                label: 'col-xs-2 registrationForm__label',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: 'registrationForm__input'
                            }}
                            valueChanged={ v => this.handleChange(v, 'name') }
                            inputId="registrationPageInput2"
                            placeholder="Ivan"
                            labelText="Name"
                            type="text"
                            error={this.state.nameError}
                        />
                        <Input
                            classes={{
                                label: 'col-xs-2 registrationForm__label',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                input: 'registrationForm__input'
                            }}
                            valueChanged={ v => this.handleChange(v, 'surname') }
                            inputId="registrationPageInput3"
                            placeholder="Ivanov"
                            labelText="Surname"
                            type="text"
                        />
                        <Select
                            classes={{
                                label: 'col-xs-2 registrationForm__label',
                                selectWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger',
                                select: 'registrationForm__select'
                            }}
                            valueChanged={ v => this.handleChange(this.props.locations[v].name, 'location') }
                            labelText="Location"
                            multiple={false}
                            options={this.props.locations}
                        />
                        <div className="registration__button">
                            <button
                                ref="btn"
                                disabled={ this.props.isLoading }
                                className="btn btn-success registrationForm__submitBtn"
                                onClick={ this.handleClick }>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.registrationSubmit.isLoading,
    locations: state.registrationSubmit.locations
});

const mapDispatchToProps = dispatch => ({
    registrationActions: bindActionCreators(registrationActions, dispatch)
});

RegistrationPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registrationActions: PropTypes.object.isRequired,
    locations: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
