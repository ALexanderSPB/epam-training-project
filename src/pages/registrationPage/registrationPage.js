import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from '../../common/ui/input';
import Select from '../../common/ui/select';
import Loader from '../../common/ui/loader/loader';
import Firebase from '../../common/helpers/firebase';
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
            nameeEror: '',
            passwordError: ''
        }
    }

    componentDidMount() {
        this.props.registrationActions.registrationGetLocations();
    }

    isValidEmail(email) {
        let r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
        if (!r.test(email))
            return false;
        return true;
    }

    handleClick = (e) => {
        e.preventDefault();
        let error = false;
        let emailError, nameError, passwordError;
        if (!this.isValidEmail(this.state.email)) {
            error = true;
            emailError = 'Неправильная почта';
        } else {
            emailError = '';
        }
        if (this.state.name.length === 0) {
            error = true;
            nameError = 'Введите имя';
        } else {
            nameError = '';
        }
        if (this.state.password.length < 6) {
            error = true;
            passwordError = 'Пароль должен иметь > 6 символов';
        } else {
            passwordError = '';
        }

        this.setState({ emailError, nameError, passwordError });

        if (error) return;

        const { email, password, name, surname, location } = this.state;

        this.props.registrationActions.registrationSubmit({
            name: name + ' ' + surname,
            email,
            password,
            location
        });
    }

    handleChange(value, field) {
        this.setState({ [field]: value });
        console.log(value + ' ' + field);
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
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger'
                            }}
                            valueChanged={ v => this.handleChange(v, 'email') }
                            inputId="registrationPageInput0"
                            labelText="Электорнная почта"
                            type="text"
                            error={this.state.emailError}
                        />
                        <Input
                            classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger'
                            }}
                            valueChanged={ v => this.handleChange(v, 'password') }
                            inputId="registrationPageInput1"
                            labelText="Пароль"
                            type="password"
                            error={this.state.passwordError}
                        />
                        <Input
                            classes={{
                               label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger'
                            }}
                            valueChanged={ v => this.handleChange(v, 'name') }
                            inputId="registrationPageInput2"
                            labelText="Имя"
                            type="text"
                            error={this.state.nameError}
                        />
                        <Input
                            classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error: 'col-xs-3 text-danger'
                            }}
                            valueChanged={ v => this.handleChange(v, 'surname') }
                            inputId="registrationPageInput3"
                            labelText="Фамилия"
                            type="text"
                        />
                        <Select
                            classes={{
                                label: 'col-xs-2',
                                inputWrapper: 'col-xs-7',
                                error:'col-xs-3 text-danger'
                            }}
                            valueChanged={ v => this.handleChange(this.props.locations[v].name, 'location') }
                            labelText="Здание"
                            multiple={false}
                            options={this.props.locations}
                        />
                        <div className="registration__button">
                            <button
                                ref="btn"
                                disabled={ this.props.isLoading }
                                className="btn btn-success"
                                onClick={ this.handleClick }>
                            Зарегистрироваться </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    };
}
const mapStateToProps = state => ({
    isLoading: state.registrationGetLocations.isLoading,
    locations: state.registrationGetLocations.locations
})

const mapDispatchToProps = dispatch => ({
    registrationActions: bindActionCreators(registrationActions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationPage)
