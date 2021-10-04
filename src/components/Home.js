import React, { Component, Fragment } from 'react';

export default class Home extends Component {
    render()
    {
        return (
            <Fragment>
                <div className="container">
                    <div className="col-lg">
                    <div className="shadow-lg jumbotron" style={{marginTop: '5vh'}}>
                        <h1 className="display-4">Citadel Cards are here</h1>
                        <p className="lead">The wait is over. The only business card you'll ever need is waiting to be made.</p>
                        <hr className="my-4" />
                        <p>Sign in to get started</p>
                        <a className="btn btn-primary btn-lg" href="" role="button">Sign in</a>
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}