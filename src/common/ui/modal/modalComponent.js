import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Modal extends Component {

    static defaultProps = {
        visible: false,
        openButtonTitle: 'Open Modal window',
        title: '',
        text: '',
        footerButtons: []
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            openButtonTitle: this.props.openButtonTitle,
            title: this.props.title,
            text: this.props.text,
            footerButtons: this.props.footerButtons
        };
    }

    toggleModal() {
        this.setState({ visible: !this.state.visible });
    }


    render() {
        let modalClass = classNames({
            'modal fade in': this.state.visible,
            'modal fade': !this.state.visible
        });
        let modalStyles = this.state.visible ? {display: 'block'} : {};
        let backdrop = this.state.visible ? (
                <div className="modal-backdrop fade in" data-backdrop="static"/>
            ) : null;

        let title = this.state.title ? (
                <div className="modal-header">
                    <h4 className="modal-title">{this.state.title}</h4>
                </div>
            ) : null;

        return (
            <div>
                <button onClick={this.toggleModal.bind(this)}>{this.state.openButtonTitle}</button>

                <div className={modalClass} style={modalStyles}>

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
                                <p>{this.state.text}</p>
                            </div>
                            <div className="modal-footer">
                                {this.state.footerButtons.map(
                                    (item, id) =>
                                            <button
                                                key={id}
                                                type="button"
                                                className={classNames(item.type)}
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
    text: PropTypes.string,
    title: PropTypes.string,
    footerButtons: PropTypes.array
}
