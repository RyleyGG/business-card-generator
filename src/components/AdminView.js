import React, { Component } from 'react';
import { DataTable } from './utility/DataTable';
import ReactDOM from 'react-dom';
import axios from "axios";
import EditProfile from './EditProfile';
import { Auth } from '@aws-amplify/auth';
const config = require('../config.json');
const $ = require('jquery');

class AdminView extends Component {

    /* note, with more understanding of how DataTables integrates into React (and with a paid subscription),
    everything here could be done within a JS Datatable as it allows selection AND on-the-fly editing */

    /* handles form submission */
    handleSubmit = async event => 
    {
      event.preventDefault(); /* prevents page resubmission */
    }
    
    redirectUnauthorizedUsers = event =>
    {
        if (!this.props.authObj.isAdmin)
        {
            this.props.history.push('/');
        }
    }

    readUsers = async () =>
    {
        $(".adminViewElem").hide();
        let userListDirty = await axios.get(`${config.api.invokeUrl}/users`);
        userListDirty = userListDirty.data.Items;
        console.log(userListDirty);
        ReactDOM.render(<DataTable data={userListDirty}/>, document.getElementById('readUsersDiv'));
        $("#readUsersDiv").show();
    }

    displayProfileFields = async (operation) =>
    {   
        $(".adminViewElem").hide();

        /* reset elements */
        $("#emailFormGroup").show();  
        $("#usernameFormGroup").show(); 
        $("#fullnameFormGroup").show(); 
        $("#birthdayFormGroup").show(); 
        $("#jobtitleFormGroup").show(); 
        $("#employerFormGroup").show(); 
        $("#cityFormGroup").show(); 
        $("#phonenumberFormGroup").show();

        /* importing the normal profile details page as template */
        const editProfileSect = ReactDOM.render(<EditProfile { ...this.props } authObj= { this.props.authObj } />, document.getElementById('createUserOptDiv'));
        

        /* making minor adjustments to the above code to fit new requirements */
        $("#passwordForm").hide();
        if (operation === 'create')
        {
            $("#submitBtn").text("Create User");
            $("#submitBtn").on("click", this.createUser); 
            $("#emailFormGroup").show();  
            $("#fullnameFormGroup").hide(); 
            $("#birthdayFormGroup").hide(); 
            $("#jobtitleFormGroup").hide(); 
            $("#employerFormGroup").hide(); 
            $("#cityFormGroup").hide(); 
            $("#phonenumberFormGroup").hide();
        }     
        else if (operation === 'update')
        {
            $("#submitBtn").text("Update User");
            $("#submitBtn").on("click", this.updateUser);   
        }
        else
        {
            $("#submitBtn").text("Delete User");
            $("#submitBtn").on("click", this.deleteUser);
            $("#emailFormGroup").show();  
            $("#fullnameFormGroup").hide(); 
            $("#birthdayFormGroup").hide(); 
            $("#jobtitleFormGroup").hide(); 
            $("#employerFormGroup").hide(); 
            $("#cityFormGroup").hide(); 
            $("#phonenumberFormGroup").hide();
        }

        editProfileSect.setState(
        {
            "email": ''
        });

        editProfileSect.setState(
        {
            "username": ''
        });


        $("#createUserOptDiv").show()
    }

    
    createUser = async (event) =>
    {
        event.preventDefault();

        $("#submitBtn").off(); /* prevents events from stacking */
        $(".adminViewElem").hide();
        try
        {

            const params =
            {
                "email": $("#email").val(),
                "username": $("#username").val(),
                "fullname": $("#fullname").val(),
                "birthday": $("#birthday").val(),
                "job_title": $("#jobtitle").val(),
                "employer": $("#employer").val(),
                "city": $("#city").val(),
                "phone_number": $("#phonenumber").val()
            }
            
            /* call sign up method, which will trigger a confirmation email to be sent */
            /* lambda function set up to add user to user group and db upon confirmation */
            /* for a user created this way, they first have to confirm their account, then request a
            password reset. */

            /* the signup function requires a password on execution. The following code will generate a cryptographically sound
            password that is guaranteed to meet the Cognito password policy */

            /* generating number that acts as the base for the password */
            let cryptoArray = new Uint32Array(1);
            window.crypto.getRandomValues(cryptoArray);
            let cryptoPassInitial = cryptoArray[0].toString().split("");

            /* generating placement of the characters that will satisfy Cognito requirements */
            let cryptoPassCapitalPlacement = Math.floor(Math.random() * (cryptoPassInitial.length - 0) + 0);
            let cryptoPassLowerPlacement = Math.floor(Math.random() * (cryptoPassInitial.length - 0) + 0);
            let cryptoPassSymbolPlacement = Math.floor(Math.random() * (cryptoPassInitial.length - 0) + 0);

            /* generating the characters themselves */
            let capitalLetter = String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
            let smallLetter = String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97));
            let symbol = String.fromCharCode(94,36,42,46,40,41,60,61,63,44).split("")[Math.floor(Math.random() * (9 - 0) + 0)];

            /* adding the characters in at their designated indices */
            let cryptoPassFull = [];
            for (let i = 0; i < cryptoPassInitial.length; i++)
            {
                if (i === cryptoPassCapitalPlacement)
                {
                    cryptoPassFull.push(capitalLetter);
                }

                if (i === cryptoPassSymbolPlacement)
                {
                    cryptoPassFull.push(symbol);
                }

                if (i === cryptoPassLowerPlacement)
                {
                    cryptoPassFull.push(smallLetter);
                }

                cryptoPassFull.push(cryptoPassInitial[i]);
            }

            cryptoPassFull = cryptoPassFull.join("");
            const { username, email } = params;
            await Auth.signUp({
                username,
                "password": cryptoPassFull,
                attributes:
                {
                    email: email
                }
            }); 
        }
        catch(error)
        {
            console.log(error);
        }

        this.readUsers();
    }

    updateUser = async (event) =>
    {
        event.preventDefault();
        $("#submitBtn").off(); /* prevents events from stacking */
        $(".adminViewElem").hide();
        try
        {

            const params =
            {
                "email": $("#email").val(),
                "username": $("#username").val(),
                "fullname": $("#fullname").val(),
                "birthday": $("#birthday").val(),
                "job_title": $("#jobtitle").val(),
                "employer": $("#employer").val(),
                "city": $("#city").val(),
                "phone_number": $("#phonenumber").val()
            }
            await axios.patch(`${config.api.invokeUrl}/users/${params.email}`, params);
        }
        catch(error)
        {
            console.log(error);
        }

        this.readUsers();
    }

    deleteUser = async (event) =>
    {
        event.preventDefault();
        $("#submitBtn").off(); /* prevents events from stacking */
        $(".adminViewElem").hide();

        try
        {
            await axios.delete(`${config.api.invokeUrl}/users/${$("#username").val()}`);
            await axios.delete(`${config.api.invokeUrl}/users/${$("#email").val()}`);
        }
        catch(error)
        {
            console.log(error);
        }

        this.readUsers();
    }
    
    render() 
    {                
        this.redirectUnauthorizedUsers();

        return (
            <section>
            { this.props.authObj.isAdmin &&
            (
            <div className="container">
                <br/>
                <h1>Admin Commands</h1>
                <br/>

                <div className="formgroup form-check-inline">
                    <button className="btn btn-primary" onClick={() => this.displayProfileFields("create")}>Create User</button>
                </div>

                <div className="formgroup form-check-inline">
                    <button className="btn btn-primary" onClick={this.readUsers}>Read Users</button>
                </div>

                <div className="formgroup form-check-inline">
                    <button className="btn btn-primary" onClick={() => this.displayProfileFields("update")}>Update Users</button>
                </div>

                <div className="formgroup form-check-inline">
                    <button className="btn btn-primary" onClick={() => this.displayProfileFields("delete")}>Delete User</button>
                </div>
            </div>
            )}
            <div className = 'adminViewElem' id = 'readUsersDiv'></div>
            <div className = 'adminViewElem' id = 'createUserOptDiv'></div>

            </section>
        );
    }
}

export default AdminView;