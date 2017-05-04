import React, { Component } from 'react';

export default class ModalComponent extends Component {

    componentWillMount() {
        this.state = {
            visible: this.props.visible ? this.props.visible : true,
            modal_header: this.props.modal_header ? this.props.modal_header : '',
            modal_content: this.props.modal_content ? this.props.modal_content : '',
            cancel_title: this.props.cancel_title ? this.props.cancel_title : 'Закрыть',
            action_title: this.props.action_title ? this.props.action_title : 'ОК'
        };
    }


    closeModal() {
        this.setState({
            visible: false
        });
    }

    actionModal() {
        this.setState({
            visible: false
        });
    }

    openModal() {
        this.setState({
            visible: true
        });

    }

    render() {
        let modalClass = this.state.visible ? 'modal fade in' : 'modal fade';
        let modalStyles = this.state.visible ? {display: 'block'} : {};
        let backdrop = this.state.visible ? (
                <div className='modal-backdrop fade in' onClick={this.close} />
            ) : null;
        let modal_header = this.state.modal_header ? (
                <div className='modal-header'>
                    <h4 className='modal-title'>{this.state.modal_header}</h4>
                </div>
            ) : null;

        return (
            <div className={modalClass} style={modalStyles}>
                {backdrop}
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        {modal_header}
                        <div className='modal-body'>
                            <p>{this.state.modal_content}</p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default'
                                    onClick={this.close}>{this.state.cancel_title}</button>
                            <button type='button' className='btn btn-primary'
                                    onClick={this.action}>{this.state.action_title}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}