import React from 'react';
import { Button, Input } from 'react-bootstrap';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const CLASS_NAMES = {
    EMAIL_PASS_LABEL: 'email-pass-label',
    LOGIN_CONTAINER: 'login-container',
    LOGIN_TITLE: 'login-title',
    INPUT_STYLE: 'input-style',
    LOGIN_BTN: 'login-btn'


}

const TEXT_CONSTANTS = {
    FULL_NAME: 'Full Name',
    PHONE: 'Phone',
    EMAIL: 'Email'
}

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false,
            errorMessage: ''

        }
    }

    componentDidUpdate(prevProps) {

    };

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value})
    }

    loginUser = (credentials) => {
        console.log("Credentials", credentials);
        const url = `https://contacts-api-demo.herokuapp.com/auth/login`;
        fetch(url, {
            method: 'post', // or 'PUT'
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(response => {response.json().then((result)=> {
                this.setToken(result.token);
            })})
            .then(data => setTimeout(
               () => this.props.loggedIn(true), 
               1000
             ))
            .catch((error) => this.setState({errorMessage: error.message}));
    };

    login = () => {
        const credentials = {
            email: this.state.email,
            password: this.state.password
        }

        this.loginUser(credentials)
    }


    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    render() {
        const {email, password} = this.state
        return (
           <div className={CLASS_NAMES.LOGIN_CONTAINER}>
               <div className={CLASS_NAMES.LOGIN_TITLE}>Login</div>
               <div>
                <label className={CLASS_NAMES.EMAIL_PASS_LABEL}>Email</label>
                <input
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        className={CLASS_NAMES.INPUT_STYLE}
                />
               </div>
               <div>
                <label className={CLASS_NAMES.EMAIL_PASS_LABEL}>Password</label>
                <input
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        className={CLASS_NAMES.INPUT_STYLE}
                />

               </div>
               <Button  className={CLASS_NAMES.LOGIN_BTN}  onClick={this.login}>Login</Button>
               
           </div>
        );
    };

}



export default LoginPage;