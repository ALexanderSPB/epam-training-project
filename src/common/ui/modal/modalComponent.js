import React, { Component } from 'react';

export default class Modal extends Component {

    static defaultProps = {
        visible: false,
        openButtonTitle: 'Открыть модальное окно',
        cancelButtonTitle: 'Закрыть',
        title: '',
        text: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            openButtonTitle: this.props.openButtonTitle,
            cancelButtonTitle: this.props.cancelButtonTitle,
            title: this.props.title,
            text: this.props.text
        };
    }

    toggleModal() {
        this.setState({ visible: !this.state.visible });
    }


    render() {
        let modalClass = this.state.visible ? 'modal fade in' : 'modal fade';
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
                            {title}
                            <div className="modal-body">
                                <p>{this.state.text}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default"
                                        onClick={this.toggleModal.bind(this)}>{this.state.cancelButtonTitle}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {backdrop}
            </div>
        )
    }
}
