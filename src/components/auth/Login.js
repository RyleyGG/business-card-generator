import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { AuthErrorStrings } from '@aws-amplify/auth';


class Login extends Component {
    state = 
    {
      username: "",
      password: "",
      errors: {
        cognito: null,
        blankfield: false
      }
    };

    /* resets errors for further input validation */
    clearErrorState = () => 
    {
      this.setState({
        errors: {
          cognito: null,
          blankfield: false
        }
      });
    };

    /* handles form submission */
    handleSubmit = async event => 
    {
      event.preventDefault(); /* prevents page resubmission */

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
    };

    render() 
    {
      return (
        <section className="auth">
          <div className="container">
            <br/>
            <h1>Log In</h1>
            <FormErrors formerrors={this.state.errors} />

            <form onSubmit={this.handleSubmit}>

              {/* Username input */}
              <div className="field">
                  <input 
                    className="input" 
                    type="text"
                    id="username"
                    aria-describedby="usernameHelp"
                    placeholder="Enter username or email"
                    value={this.state.username}
                    onChange={this.onInputChange}
                  />
              </div>

              <br/>

              {/* Password input */}
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
              <div className="field">
                <p className="control">
                  <a href="/forgotpassword">Forgot password?</a>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="btn btn-dark">
                    login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      );
    }
}

export default Login;