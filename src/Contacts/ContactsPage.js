import React from 'react';
import { Button, ListGroup, Alert} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import phoneIcon from '@fortawesome/fontawesome-free/svgs/solid/phone.svg';
import userIcon from '@fortawesome/fontawesome-free/svgs/solid/user.svg';
import emailIcon from '@fortawesome/fontawesome-free/svgs/solid/envelope.svg';
import './Contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContactModal from './AddContactModal';



const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmdlbGFAZXhhbXBsZS5jb20iLCJyb2xlcyI6W10sImlhdCI6MTYwMzgwNjM5NCwiZXhwIjoxNjAzODA5OTk0fQ.ziszL8wEQCYkvX2G5WQlrLTY8tvX-9hpQLZLRDq6_Pc';

const CLASS_NAMES = {
     CONTACT_CONTAINER: 'contact-container',
     CONTACT_HEADER: 'contact-header',
     CONTACT_PAGE_TITLE: 'contact-page-title',
     CONTACT_INFO: 'contact-info',
     LOADER: 'loader',
     ADD_CONTACT_BTN: 'add-contact-btn',

}

 export class ContactsPage extends React.Component {
     constructor(props) {
         super(props);
        this.state = {
            contactList: [],
            isLoaded: false,
            error: null,
            showAddContactModal: false,
            data: null
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
        console.log("TOKEN", token)
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
        console.log("CONTACT 2", contact);
        console.log("TOKEN", token)
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
            .then(data => this.setState({success: true}))
            .catch((error) => this.setState({errorMessage: error.message}));
       };

     onShowAddContactModal = () => {
         this.setState({showAddContactModal: true})
     }

     onHideAddContactModal = () => {
         this.setState({showAddContactModal: false})
     }


  render() {
    const {isLoaded, contactList, error, showAddContactModal, success} = this.state;
    console.log("CONTACT list", contactList)
    console.log("DATATATTATA", this.state)
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