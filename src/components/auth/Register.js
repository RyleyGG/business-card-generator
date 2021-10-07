import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class Register extends Component {
    state = 
    {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
    }
    }

    /* resets errors for further input validation */
    clearErrorState = () => 
    {
        this.setState({
            errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
            }
        });
    }

    /* handles form submission */
    handleSubmit = async event => 
    {
        event.preventDefault();

        /* Validating form data */
        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) 
        {
            this.setState({
                errors: { ...this.state.errors, ...error }
            });
        }

        const { username, email, password } = this.state;
        try
        {
            await Auth.signUp({
                username,
                password,
                attributes:
                {
                    email: email
                }
            });

            this.props.history.push('/welcome');
        }
        catch(error)
        {
            let err = null;
            !error.message ? err = {"message": error} : err = error; /* ensuring error is in proper format */
            this.setState({
                errors:
                {
                    ...this.state.errors, /* preserve current errors */
                    cognito: err
                }
            })
        }
    };

    /* on input change, remove the targeted field from the list of 'bad' values */
    onInputChange = event => 
    {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("badValue");
    }

    render() 
    {
        return (
            <div className="container">
                <br/>
                <h1>Register</h1>
                <FormErrors formerrors={this.state.errors} />

                <form onSubmit={this.handleSubmit}>

                    <br/>
                    
                    {/* username submit */}
                    <div className = 'formgroup'>
                        <label for="username">Username</label>
                        <input 
                        className="input form-control" 
                        type="text"
                        id="username"
                        aria-describedby="userNameHelp"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        />
                    </div>

                    {/* email submit */}
                    <div className = 'formgroup'>
                        <label for="email">Email</label>
                        <input 
                        className="input form-control" 
                        type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                        />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    {/* password submit */}
                    <div className = 'formgroup'>
                        <label for="password">Password</label>
                        <input 
                        className="input form-control" 
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        />
                    </div>

                    {/* confirm password submit */}
                    <div className = 'formgroup'>
                        <label for="confirmpassword">Confirm Password</label>
                        <input 
                        className="input form-control" 
                        type="password"
                        id="confirmpassword"
                        placeholder="Confirm password"
                        value={this.state.confirmpassword}
                        onChange={this.onInputChange}
                        />
                    </div>

                    <button className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;