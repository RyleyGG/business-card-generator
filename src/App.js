/* react elements */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* components */
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import Generate from './components/Generate';
import EditProfile from './components/EditProfile';

/* style sheets */
import './mainstyle.css';

class App extends Component {

    state =
    {
        isAuthenticated: false,
        user: null
    }


    /* setting current authentication status globally for use across all components */
    setAuthStatus = authenticated =>
    {
        this.setState({ isAuthenticated: authenticated});
    }

    setUser = user =>
    {
        this.setState({user: user });
    }

    render()
    {
        const authObj =
        {
            isAuthenticated: this.state.isAuthenticated,
            user: this.state.user,
            setAuthStatus: this.setAuthStatus,
            setUser: this.setUser
        }
        console.log(authObj.isAuthenticated);
        return (
            <div>
            {/* Bootstrap and jquery */}
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
            <link rel="stylesheet" href="mainstyle.css" />

            <Router>
                <Navbar authObj = { authObj }/>
                <Route exact path="/" render={(props) => <Home { ...props } authObj= { authObj } />} />
                <Route exact path="/login" render={(props) => <Login { ...props } authObj= { authObj } />} />
                <Route exact path="/register" render={(props) => <Register { ...props } authObj= { authObj } />} />
                <Route exact path="/welcome" render={(props) => <Welcome { ...props } authObj= { authObj } />} />
                <Route exact path="/generate" render={(props) => <Generate { ...props } authObj= { authObj } />} />
                <Route exact path="/editprofile" render={(props) => <EditProfile { ...props } authObj= { authObj } />} />
            </Router>
            
            </div>

        );
    }
}

export default App;
