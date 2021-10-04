import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";

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

        /* TODO: Cognito integration */
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
        <section className="auth">
            <div className="container">
            <br/>
            <h1>Register</h1>
            <FormErrors formerrors={this.state.errors} />

            <form onSubmit={this.handleSubmit}>

                {/* username submit */}
                <div className="field">
                    <input 
                    className="input" 
                    type="text"
                    id="username"
                    aria-describedby="userNameHelp"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.onInputChange}
                    />
                </div>

                <br/>

                {/* email submit */}
                <div className="field">
                    <input 
                    className="input" 
                    type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onInputChange}
                    />
                </div>

                <br/>

                {/* password submit */}
                <div className="field">
                    <input 
                    className="input" 
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onInputChange}
                    />
                </div>

                <br/>

                {/* confirm password submit */}
                <div className="field">
                    <input 
                    className="input" 
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm password"
                    value={this.state.confirmpassword}
                    onChange={this.onInputChange}
                    />
                </div>

                <br/>

                <div className="field">
                <p className="control">
                    <button className="button is-success">
                    Register
                    </button>
                </p>
                </div>
            </form>
            </div>
        </section>
        );
    }
}

export default Register;