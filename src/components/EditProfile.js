import React, { Component } from 'react';


class EditProfile extends Component {

    state =
    {
        "username": this.props.authObj.user.username,
        "email": this.props.authObj.user.attributes.email
    }

    /* handles form submission */
    handleSubmit = async event => 
    {
      event.preventDefault(); /* prevents page resubmission */
    }
    
    redirectUnauthorizedUsers = event =>
    {
        if (!this.props.authObj.isAuthenticated)
        {
            this.props.history.push('/');
        }
    }

    onUsernameChange(value)
    {
        this.setState(
        {
            "username": value
        });
    }

    /* disabled in this view, but is allowed when admin is creating a new user */
    onEmailChange(value)
    {
        this.setState(
        {
            "email": value
        });
    }

    render() 
    {
        this.redirectUnauthorizedUsers();
        
        return (
            <section>

            { this.props.authObj.isAuthenticated &&
            (
            <div className="container">
                <br/>
                <h1>Profile Details</h1>
                <br/>

                <form onSubmit={this.handleSubmit}>

                {/* Email input, just for display */}
                <div className="formgroup" id = 'emailFormGroup' style={{display: 'none'}}>
                    <label htmlFor="email">Email</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange = {e => this.onEmailChange(e.target.value)}
                    />
                </div>
                
                {/* Username input, just for display */}
                <div className="formgroup" id = 'usernameFormGroup'>
                    <label htmlFor="username">Username</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="username"
                    aria-describedby="usernameHelp"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange = {e => this.onUsernameChange(e.target.value)}
                    />
                </div>

                {/* Full name input */}
                <div className="formgroup" id = 'fullnameFormGroup'>
                    <label htmlFor="fullname">Full Name</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="fullname"
                    aria-describedby="fullnameHelp"
                    placeholder="Enter full name"
                    
                    />
                </div>
                
                {/* Birthday input */}
                <div className="formgroup" id = 'birthdayFormGroup'>
                    <label htmlFor="birthday">Birthday</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="birthday"
                    aria-describedby="birthdayHelp"
                    placeholder="Enter birthday"
                    />
                    <small id="birthdayHelp" className="form-text text-muted">Please use MM/DD/YYYY format</small>
                </div>
                
                {/* Job Title input */}
                <div className="formgroup" id = 'jobtitleFormGroup'>
                    <label htmlFor="jobtitle">Job Title</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="jobtitle"
                    aria-describedby="jobtitleHelp"
                    placeholder="Enter Job Title"
                    
                    />
                </div>
                
                {/* Employer input */}
                <div className="formgroup" id = 'employerFormGroup'>
                    <label htmlFor="employer">Employer</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="employer"
                    aria-describedby="employerHelp"
                    placeholder="Enter employer"
                    
                    />
                </div>
                
                {/* City input */}
                <div className="formgroup" id = 'cityFormGroup'>
                    <label htmlFor="city">City</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="city"
                    aria-describedby="cityHelp"
                    placeholder="Enter city"
                    
                    />
                </div>
                
                {/* Phone number input */}
                <div className="formgroup" id = 'phonenumberFormGroup'>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input 
                    className="input form-control" 
                    type="text"
                    id="phonenumber"
                    aria-describedby="phonenumberHelp"
                    placeholder="Enter phone number"
                    
                    />
                </div>

                {/* Password input */}
                <br/>
                <br/>
                <div className="formgroup" id = 'passwordForm'>
                    <a className="btn btn-outline-warning" href = '/changepassword'>Change Password</a>
                    <small id="passwordHelp" className="form-text text-muted">This will redirect you to a different page.</small>
                </div>
            
                <div className="formgroup">
                    <button className="btn btn-primary" id = 'submitBtn'>Save Changes</button>
                </div>
                </form>
            </div>
            )}

            </section>
        );
        }
}

export default EditProfile;