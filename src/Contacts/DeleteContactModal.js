import React from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

export class DeleteContactModal extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps) {
        if(prevProps.success !== this.props.success) {
            this.handleClose();
        }
    };

    handleClose = () => {
        this.props.onHide();
    }


    deleteContact = () => {
        const {id, onDeleteContact} = this.props;
        onDeleteContact(id);
    }



    render() {
        return (
            <Modal
                show={this.props.onShow}
                onHide={this.handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span>Are you sure you want to delete this contact ?</span>
                </Modal.Body>
                {this.props.success ?  <Alert variant='success'>Successfully Deleted Contact</Alert> : null}

                <Modal.Footer>
                    <Button className="cancel-btn" onClick={this.handleClose}>Close</Button>
                    <Button className="delete-btn" onClick={this.deleteContact}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    };

}



export default DeleteContactModal;