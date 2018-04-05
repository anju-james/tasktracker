import React from 'react'
import { connect } from 'react-redux';
import store, {empty_register_form} from './store';
import {update_register_form} from './actions';
import {createUser} from './sevices';
import {Redirect} from 'react-router-dom';
import Layout from "./layout";


class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        store.dispatch(update_register_form(data));
    }

    createUser(user) {
        let jsonData = JSON.stringify({
            user: user,
        });
        let email = user.email;
        // reset form fields
        store.dispatch(update_register_form(empty_register_form));
        $.ajax('/api/v1/users', {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: jsonData,
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus + '- Creating user failed. Reason:' + jqXHR.responseText)
            },success: (resp) => {
                alert("User account for  '"+email+ "' created successfully");
                this.props.history.push('/');
            }
        });
    };

    handleSubmit(ev) {
        ev.preventDefault();
        let clear_passwords = {password: "", confirmpassword: ""}
        let register = this.props.register_form;
        if (!register.name || register.name.trim().length == 0) {
            alert('Name is required');
        } else if (!register.email || register.email.trim().length == 0) {
            alert('Email is required');
        }else if (!register.password || register.password.trim().length == 0) {
            alert('Password is missing');
        }else if (!register.confirmpassword || register.confirmpassword.trim().length == 0) {
            alert('Please confirm password');
        } else if (register.password.trim().length < 8 || register.confirmpassword.trim().length < 8 ) {
            alert("Please doesn't meet minimum length required (8)");
        } else if (register.password != register.confirmpassword) {
            alert('Password and confirm password doesnot match. Try again');
            store.dispatch(update_register_form(clear_passwords));
        } else if (!register.email.includes("@") || register.email.split("@").length !=2) {
            alert('Not a valid email address. Try again');
        } else {
            this.createUser(register);
            // redirect user to login page
        }
    }

    render() {
        if (this.props.current_user && this.props.current_user.token) {
            return (<Redirect to='/issues' />);
        }

        let register = this.props.register_form;
        return (
            <Layout>
            <div>
                <h3>
                    Register
                </h3>
                <div className="form-group">
                    <label htmlFor="name" className="control-label">
                        Name
                    </label>
                    <input type="text" name="name" className="form-control" value={register.name} onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="control-label">
                        Email
                    </label>
                    <input type="email" name="email" className="form-control" value={register.email} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="control-label">
                        Password
                    </label>
                    <input type="password" name="password" className="form-control" value={register.password} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordconfirm" className="control-label">
                        Confirm Password
                    </label>
                    <input type="password" name="confirmpassword" className="form-control" value={register.confirmpassword} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {register_form: state.register_form};
};

const Register = connect(mapStateToProps)(RegisterView);
export default Register;