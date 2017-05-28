import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './modalComponent.css';

export default class Modal extends Component {

    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            visible: this.props.visible
        };
    }

    toggleModal() {
        this.setState({ visible: !this.state.visible });
    }

    static identifyClass(type) {
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
        const {children, openButtonTitle, title, footerButtons} = this.props;
        const {visible} = this.state;

        const modalClass = classNames({
            'modal fade': true,
            'in': visible,
            'hide': !visible
        });
        const backdrop = visible ? (
            <div className="modal-backdrop fade in"/>
        ) : null;

        const modalTitle = title ? (
            <h4 className="modal-title">{title}</h4>
        ) : null;

        return (
            <div>
                <button className="modal__open-button" onClick={this.toggleModal.bind(this)}>{openButtonTitle}</button>
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
                            {modalTitle}
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                {footerButtons.map((item, id) =>
                                    <button
                                        key={id}
                                        type="button"
                                        className={
                                            classNames(Modal.identifyClass(item.type))
                                        }
                                        onClick={() => {
                                            item.onClick();
                                            this.toggleModal();
                                        }}>
                                        {item.text}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {backdrop}
            </div>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.object.isRequired,
    openButtonTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    footerButtons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
};

Modal.defaultProps = {
    visible: false,
    openButtonTitle: 'Open Modal window',
    title: '',
    footerButtons: []
};

