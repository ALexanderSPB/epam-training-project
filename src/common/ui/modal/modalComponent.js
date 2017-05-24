import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modalComponent.css'

export default class Modal extends Component {

    static defaultProps = {
        visible: false,
        openButtonTitle: 'Open Modal window',
        title: '',
        footerButtons: []
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
    }

    toggleModal() {
        this.setState({ visible: !this.state.visible });
    }

    identifyClass(type) {
        const classes = {
            danger: 'btn btn-danger',
            primary: 'btn btn-primary',
            success: 'btn btn-success',
            warning: 'btn btn-warning',
            link: 'btn btn-link',
            default: 'btn btn-default'
        };
        return classes[type];
    }

    render() {
        let modalClass = classNames({
            'modal fade': true,
            'in': this.state.visible,
            'hide': !this.state.visible
        });
        let backdrop = this.state.visible ? (
                <div className="modal-backdrop fade in"/>
            ) : null;

        let title = this.props.title ? (
                    <h4 className="modal-title">{this.props.title}</h4>
            ) : null;

        return (
            <div>
                <button onClick={this.toggleModal.bind(this)}>{this.props.openButtonTitle}</button>
                <div className={modalClass}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button"
                                        className="close"
                                        aria-label="Close"
                                        onClick={this.toggleModal.bind(this)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {title}
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                {this.props.footerButtons.map( (item, id) =>
                                    <button
                                        key={id}
                                        type="button"
                                        className={
                                            classNames(this.identifyClass(item.type))
                                        }
                                        onClick={item.onClick}>
                                    {item.text}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {backdrop}
            </div>
        )
    }
}

Modal.PropTypes = {
    title: PropTypes.string,
    openButtonTitle: PropTypes.string.isRequired,
    footerButtons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
}

