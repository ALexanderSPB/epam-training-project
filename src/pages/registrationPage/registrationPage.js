import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Input from '../../common/ui/input';
import Select from '../../common/ui/select';
import Loader from '../../common/ui/loader/loader';
import './registrationPage.css';
import {registrationGetLocations, registrationSubmit} from './registrationPageActions';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setEmailError = this.setEmailError.bind(this);
        this.setNameError = this.setNameError.bind(this);
        this.setPasswordError = this.setPasswordError.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    handleChange(value, field) {
        this.setState({[field]: value});
    }

    handleClick() {
        const emailError = this.setEmailError();
        const nameError = this.setNameError();
        const passwordError = this.setPasswordError();

        this.setState({emailError, nameError, passwordError});

        if (this.hasErrors) return;

        const {email, password, name, surname, location} = this.state;
        console.log('');
        this.props.registrationSubmit({
            name: name + ' ' + surname,
            email,
            password,
            location
        });
    }

    setEmailError() {
        return !RegistrationPage.isValidEmail(this.state.email) ? 'Invalid E-Mail' : '';
    }

    setNameError() {
        return this.state.name.length === 0 ? 'Name is required' : '';
    }

    setPasswordError() {
        return this.state.password.length < 7 ? 'Password should be longer than 6 symbols' : '';
    }

    hasErrors() {
        const {emailError, nameError, passwordError} = this.state;
        return emailError !== '' && nameError !== '' && passwordError !== '';
    }

    componentDidMount() {
        this.props.registrationGetLocations();
    }

    static isValidEmail(email) {
        const r = /^[\w.\d-_]+@[\w.\d-_]+\.\w{2,4}$/i;
        return r.test(email);

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
                            handleBlur={() => this.setState({emailError: this.setEmailError()})}
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
                            handleBlur={() => this.setState({passwordError: this.setPasswordError()})}
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
                            handleBlur={() => this.setState({nameError: this.setNameError()})}
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
                            valueChanged={ v => this.handleChange(this.props.locations.find(location => location.uuid === v).name, 'location')}
                            labelText="Location"
                            multiple={false}
                            options={this.props.locations}
                        />
                        <div className="registration__button">
                            <button
                                type="button"
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
    registrationGetLocations: bindActionCreators(registrationGetLocations, dispatch),
    registrationSubmit: bindActionCreators(registrationSubmit, dispatch)
});

RegistrationPage.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    locations: PropTypes.array,
    registrationSubmit: PropTypes.func,
    registrationGetLocations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
