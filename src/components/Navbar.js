import Auth from '@aws-amplify/auth';
import React, { Component, Fragment } from 'react';

export default class Navbar extends Component {

    signOut = async event =>
    {
        event.preventDefault();
        try
        {
            Auth.signOut();
            this.props.authObj.setAuthStatus(false);
            this.props.authObj.setUser(null);

        }
        catch(error)
        {
            console.log(error);
        }
    }

    render()
    {
        return (
            <Fragment>
                <nav className="navbar navbar-light">
                    <ul className="nav list-unstyled">
                        <li className="nav-item active">
                            <a className="navbar-brand" href="/" style={{fontWeight: 'bold'}}>Citadel Cards</a>
                        </li>
                        
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/Generate">Generate!</a>
                        </li>
                    </ul>

                    { this.props.authObj.isAuthenticated && this.props.authObj.user &&
                    (
                        <ul className="nav justify-content-end list-unstyled">
                            <li className="nav-item">
                                <p>Logged in as: {this.props.authObj.user.username}</p>
                            </li>

                            <li className="nav-item">
                                <a className="btn btn-link" href="/editprofile" role="button">Edit Profile</a>
                            </li>

                            <li className="nav-item">
                                <a className="btn btn-link" href="/" role="button"
                                onClick={this.signOut}>
                                Sign out</a>
                            </li>
                        </ul>
                    )}

                    { !this.props.authObj.isAuthenticated &&
                    (
                        <ul className="nav justify-content-end list-unstyled">
                            <li className="nav-item active">
                                <a className="btn btn-link my-2 my-lg-0" href="/register" role="button">Register</a>
                            </li>
                            <li className="nav-item active">
                                <a className="btn btn-link my-2 my-lg-0" href="/login" role="button">Sign in</a>
                            </li>
                        </ul>
                    )}
                </nav>
            </Fragment>
        )
    }
}