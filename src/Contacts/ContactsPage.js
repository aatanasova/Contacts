import React from 'react';
import { Button, ListGroup, Alert} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import phoneIcon from '@fortawesome/fontawesome-free/svgs/solid/phone.svg';
import userIcon from '@fortawesome/fontawesome-free/svgs/solid/user.svg';
import emailIcon from '@fortawesome/fontawesome-free/svgs/solid/envelope.svg';
import trashIcon from '@fortawesome/fontawesome-free/svgs/solid/times.svg';
import editIcon from '@fortawesome/fontawesome-free/svgs/solid/pen.svg';
import './Contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContactModal from './AddContactModal';
import DeleteContactModal from './DeleteContactModal';
import EditContactModal from './EditContactModal';



const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmdlbGFAZXhhbXBsZS5jb20iLCJyb2xlcyI6W10sImlhdCI6MTYwMzk4MzI2OSwiZXhwIjoxNjAzOTg2ODY5fQ.DkeiP6NzxpWjXJLKXkQpqvhlitlhPf2tz8xdFtYYPnk';

const CLASS_NAMES = {
     CONTACT_CONTAINER: 'contact-container',
     CONTACT_HEADER: 'contact-header',
     CONTACT_PAGE_TITLE: 'contact-page-title',
     CONTACT_INFO: 'contact-info',
     LOADER: 'loader',
     ADD_CONTACT_BTN: 'add-contact-btn',
     DELETE_ICON: 'delete-icon',
     EDIT_ICON: 'edit-icon'

}

 export class ContactsPage extends React.Component {
     constructor(props) {
         super(props);
        this.state = {
            contactList: [],
            isLoaded: false,
            error: null,
            showAddContactModal: false,
            showDeleteContactModal: false,
            showEditContactModal: false,
            success: false,
            data: null,
            clickedId: null,
            clickedContact: null,
        }
     }

     componentDidMount() {
        this.fetchAllContacts();
     };

     componentDidUpdate() {
        if(this.state.success) {
            this.fetchAllContacts();
            this.setState({success: false})
        }
    };


     fetchAllContacts = () => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
         const url = `https://contacts-api-demo.herokuapp.com/contacts/`;
         fetch(url, {
             method: 'Get',
             headers:myHeaders
         })
             .then(response => response.json())
             .then(data =>  this.setState({ contactList: data.items, isLoaded: true }), )
             .catch(error => this.setState({ error, isLoaded: false }));
     };

     saveContact = (contact) => {
        const url = `https://contacts-api-demo.herokuapp.com/contacts/`;
        fetch(url, {
            method: 'post', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(contact),
        })
            .then(response => response.json())
            .then(response => this.setState({success: true, data: response}))
            .catch((error) => this.setState({errorMessage: error.message}));
       };

     onShowAddContactModal = () => {
         this.setState({showAddContactModal: true})
     }

     onHideAddContactModal = () => {
         this.setState({showAddContactModal: false})
     }

     deleteContact = (id) => {
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
         const url = `https://contacts-api-demo.herokuapp.com/contacts/`;
         fetch(url + id,{
             method: 'DELETE',
             headers: myHeaders
         })
             .then(response => this.setState({success: response.status === 200 ? true : false}))
             .catch((error) => console.log("ERROR MESSAGE", error));
     };

     onShowDeleteContactModal = (id) => {
         this.setState({showDeleteContactModal: true, clickedId: id})
     }

     onHideDeleteContactModal = () => {
         this.setState({showDeleteContactModal: false})
     }

     editContact = (id, contact) => {
        const url = `https://contacts-api-demo.herokuapp.com/contacts/`;
        fetch(url + id, {
            method: 'put', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(contact),
        })
            .then(response => this.setState({success: response.status === 200 ? true : false}))
            .catch((error) => console.log("Error", error.message));
       };




     onShowEditContactModal = (id) => {
         this.setState({showEditContactModal: true, clickedContact: id})
     }

     onHideEditContactModal = () => {
         this.setState({showEditContactModal: false})
     }


  render() {
    const { isLoaded, 
            contactList, 
            error, 
            showAddContactModal, 
            success, 
            showDeleteContactModal, 
            clickedId, 
            showEditContactModal, 
            clickedContact
        } = this.state;

    return (
        <div className={CLASS_NAMES.CONTACT_CONTAINER}>
            <div className={CLASS_NAMES.CONTACT_HEADER}>
                <h1 className={CLASS_NAMES.CONTACT_PAGE_TITLE}>Contacts</h1>
                <Button variant="primary" onClick={this.onShowAddContactModal} className={CLASS_NAMES.ADD_CONTACT_BTN}>Add Contact</Button>

            </div>
            <div>
                {isLoaded ?
                    <ListGroup>
                        {contactList.map((contact, index) => {
                            return <ListGroup.Item key={index}>
                                <div className={CLASS_NAMES.CONTACT_INFO}>
                                    <img src={userIcon} width="30" height="20"/>
                                    {contact.name}
                                </div>

                                <div className={CLASS_NAMES.CONTACT_INFO}>
                                    <img src={phoneIcon} width="30" height="20"/>
                                    {contact.phoneNumber}
                                </div>
                                <div className={CLASS_NAMES.CONTACT_INFO}>
                                    <img src={emailIcon} width="30" height="20"/>
                                    {contact.emailAddress}
                                </div>
                                <img src={trashIcon} 
                                     width="30" 
                                     height="20" 
                                     className={CLASS_NAMES.DELETE_ICON} 
                                     variant="danger" 
                                     onClick={() => this.onShowDeleteContactModal(contact.id)}/>
                                     {clickedId === contact.id ?
                                        <DeleteContactModal onShow={showDeleteContactModal} 
                                                            onHide={this.onHideDeleteContactModal}
                                                            onDeleteContact={this.deleteContact}
                                                            id={contact.id}
                                                            success={success}

                                        />
                                        : null 
                                     }
                                <img src={editIcon} 
                                     width="20" 
                                     height="20" 
                                     className={CLASS_NAMES.EDIT_ICON} 
                                     onClick={() => this.onShowEditContactModal(contact.id)}/>
                                     {clickedContact === contact.id ?
                                        <EditContactModal onShow={showEditContactModal} 
                                                        onHideModal={this.onHideEditContactModal}
                                                        contact={contact}
                                                        editContact={this.editContact}
                                                        success={success}
                                        /> 
                                        : null 
                                     }

                            </ListGroup.Item>
                        })}
                    </ListGroup> :
                    <div className={CLASS_NAMES.LOADER}>
                        <Spinner animation="border" variant="dark" role="status" size="lg">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }

            </div>
            <AddContactModal onShow={showAddContactModal} 
                             onHideModal={this.onHideAddContactModal} 
                             saveContact={this.saveContact} 
                             success={success}
            />

        </div>
      );
    };

  }

 
 
export default ContactsPage;