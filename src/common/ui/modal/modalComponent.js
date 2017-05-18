import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Modal extends Component {

    static defaultProps = {
        visible: false,
        openButtonTitle: 'Open Modal window',
        title: '',
        HTML: '',
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

    render() {
        let modalClass = classNames({
            'modal fade': true,
            'in': this.state.visible,
            'hide': !this.state.visible
        });
        let modalStyles = {display: 'block'};
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
                                <p>{this.props.HTML}</p>
                            </div>
                            <div className="modal-footer">
                                {this.props.footerButtons.map( (item, id) =>
                                    <button
                                        key={id}
                                        type="button"
                                        className={
                                            classNames({
                                                'btn': true,
                                                'btn-danger': (item.type == 'danger'),
                                                'btn-primary': (item.type == 'primary'),
                                                'btn-success': (item.type == 'success'),
                                                'btn-warning': (item.type == 'warning'),
                                                'btn-link': (item.type == 'link'),
                                                'btn-default': (item.type == '')
                                            })
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
    HTML: PropTypes.string,
    title: PropTypes.string,
    openButtonTitle: PropTypes.string,
    footerButtons: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }))
}

