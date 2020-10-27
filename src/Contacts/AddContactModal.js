import React from 'react';
import { Button, Modal, Form, Col, Alert } from 'react-bootstrap';
import './Contact.css';



const CLASS_NAMES = {
    EMAIL_INPUT: 'valid-email-input',
    CANCEL_BTN: 'cancel-btn',
    SAVE_BTN: 'save-btn'

}

const TEXT_CONSTANTS = {
    FULL_NAME: 'Full Name',
    PHONE: 'Phone',
    EMAIL: 'Email'
}

export class AddContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phone: '',
            email: '',
            isValid: false,

        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.success !== this.props.success) {
            this.handleClose();
            this.setState({
                fullName: '',
                phone: '',
                email: '',
            })
        }
    };

    handleClose = () => {
        this.props.onHideModal();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value})
    }

    addContact = () => {
        const contact = {
            email: this.state.email,
            name: this.state.fullName,
            phone: this.state.phone
        };

        this.props.saveContact(contact)
    }



    render() {
        const { fullName, phone, email} = this.state
        return (
            <Modal
                show={this.props.onShow}
                onHide={this.handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="fullName">
                                <Form.Label>{TEXT_CONSTANTS.FULL_NAME}</Form.Label>
                                <Form.Control
                                        type="text"
                                        value={fullName}
                                        name="fullName"
                                        onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="phone">
                                <Form.Label>{TEXT_CONSTANTS.PHONE}</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={phone}
                                    name="phone"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label>{TEXT_CONSTANTS.EMAIL}</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={this.handleChange}
                                    className={this.state.isValid ? CLASS_NAMES.EMAIL_INPUT : null}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                {this.props.success ?  <Alert variant='success'>Successfully Added Contact</Alert> : null}
                <Modal.Footer>
                    <Button onClick={this.handleClose} className={CLASS_NAMES.CANCEL_BTN}>Close</Button>
                    <Button onClick={this.addContact} className={CLASS_NAMES.SAVE_BTN}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    };

}



export default AddContactModal;