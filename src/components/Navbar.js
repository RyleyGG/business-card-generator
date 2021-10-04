import React, { Component, Fragment } from 'react';

export default class Navbar extends Component {
    render()
    {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="#" style={{fontWeight: 'bold'}}>Citadel Cards</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="">Generate!</a>
                            </li>
                        </ul>
                        
                        <a className="btn btn-link my-2 my-lg-0" href="/register" role="button">Create Account</a>
                        <a className="btn btn-link my-2 my-lg-0" href="/login" role="button">Sign in</a>
                    </div>
                </nav>
            </Fragment>
        )
    }
}