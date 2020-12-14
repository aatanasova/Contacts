import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ContactsPage from "./Contacts/ContactsPage";
import LoginPage from './Authentication/LoginPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logged = (login) => {
    setLoggedIn(login)    
  }

 
  console.log("LOGIN", loggedIn)

  return (
    <div className="App">
      {loggedIn ?   
        <ContactsPage />: 
        <LoginPage loggedIn={logged}/>

      }
    </div>
  );
}

export default App;
