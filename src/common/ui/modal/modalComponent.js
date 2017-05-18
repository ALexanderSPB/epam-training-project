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
        return({
            'btn': true,
            'btn-danger': (type === 'danger'),
            'btn-primary': (type === 'primary'),
            'btn-success': (type === 'success'),
            'btn-warning': (type === 'warning'),
            'btn-link': (type === 'link'),
            'btn-default': (type === '')
        })
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
                <div className="modal-header">
                    <h4 className="modal-title">{this.props.title}</h4>
                </div>
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
                            </div>
                            {title}
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
    openButtonTitle: PropTypes.string,
    footerButtons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }))
}

