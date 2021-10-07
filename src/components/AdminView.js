import React, { Component } from 'react';
import { DataTable } from './utility/DataTable';
import ReactDOM from 'react-dom';
import axios from "axios";
import EditProfile from './EditProfile';
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
        ReactDOM.render(<DataTable data={userListDirty}/>, document.getElementById('readUsersDiv'));
        $("#readUsersDiv").show();
    }

    displayProfileFields = async (operation) =>
    {   
        $(".adminViewElem").hide();

        /* reset elements */
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
            $("#usernameFormGroup").hide(); 
            $("#fullnameFormGroup").hide(); 
            $("#birthdayFormGroup").hide(); 
            $("#jobtitleFormGroup").hide(); 
            $("#employerFormGroup").hide(); 
            $("#cityFormGroup").hide(); 
            $("#phonenumberFormGroup").hide();
        }
        $("#emailFormGroup").show();

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
            await axios.post(`${config.api.invokeUrl}/users/${params.email}`, params);
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
        const email = $("#email").val();
        try
        {
            await axios.delete(`${config.api.invokeUrl}/users/${email}`);
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