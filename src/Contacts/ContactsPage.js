import React from 'react';
import { Button, ListGroup, Alert} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import phoneIcon from '@fortawesome/fontawesome-free/svgs/solid/phone.svg';
import userIcon from '@fortawesome/fontawesome-free/svgs/solid/user.svg';
import emailIcon from '@fortawesome/fontawesome-free/svgs/solid/envelope.svg';
import './Contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmdlbGFAZXhhbXBsZS5jb20iLCJyb2xlcyI6W10sImlhdCI6MTYwMzcyNDkxNywiZXhwIjoxNjAzNzI4NTE3fQ.pOIVxbiGY2Mhd2FWcYE0_EN2-ON_1Nb7W23EoNHgB8g';

const CLASS_NAMES = {
     CONTACT_CONTAINER: 'contact-container',
     CONTACT_HEADER: 'contact-header',
     CONTACT_PAGE_TITLE: 'contact-page-title',
     CONTACT_INFO: 'contact-info',
     LOADER: 'loader',
}

 export class ContactsPage extends React.Component {
     constructor(props) {
         super(props);
        this.state = {
            contactList: [],
            isLoaded: false,
            error: null,
        }
     }

     componentDidMount() {
        this.fetchAllContacts();
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


  render() {
    const {isLoaded, contactList, error} = this.state;
    console.log("CONTACT list", contactList)
    return (
        <div className={CLASS_NAMES.CONTACT_CONTAINER}>
            <div className={CLASS_NAMES.CONTACT_HEADER}>
                <h1 className={CLASS_NAMES.CONTACT_PAGE_TITLE}>Contacts</h1>
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
        </div>
      );
    };

  }

 
 
export default ContactsPage;