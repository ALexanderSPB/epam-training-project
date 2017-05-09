import React, { Component } from 'react';

export default class Modal extends Component {

    static defaultProps = {
        visible: false,
        openButtonTitle: 'Открыть модальное окно',
        cancelButtonTitle: 'Закрыть',
        actionButtonTitle: 'ОК',
        title: '',
        text: '',
        submitAction: function() {return null}
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            openButtonTitle: this.props.openButtonTitle,
            cancelButtonTitle: this.props.cancelButtonTitle,
            actionButtonTitle: this.props.actionButtonTitle,
            title: this.props.title,
            text: this.props.text,
            submitAction: this.props.submitAction
        };
    }

    toggleModal() {
        this.setState({ visible: !this.state.visible });
    }


    actionModal() {
        this.toggleModal();
        this.state.submitAction();
    }


    render() {
        let modalClass = this.state.visible ? "modal fade in" : "modal fade";
        let modalStyles = this.state.visible ? {display: "block"} : {};
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
                                <button type="button" className="btn btn-primary"
                                        onClick={this.actionModal.bind(this)}>{this.state.actionButtonTitle}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {backdrop}
            </div>
        )
    }
}
