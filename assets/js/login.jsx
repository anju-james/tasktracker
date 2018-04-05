import React from 'react';
import { connect } from 'react-redux';
import store from './store';
import {update_login_form} from "./actions";
import {NavLink, Redirect} from 'react-router-dom';
import {login} from './sevices';
import Layout from "./layout";

class LoginView extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        store.dispatch(update_login_form(data));
    }


    handleSubmit(ev) {
        ev.preventDefault();
        let data = this.props.login_form;
        if(!data.email || data.email.trim().length == 0) {
            alert('Email is required');
        } else if (!data.password || data.password.trim().length == 0) {
            alert('Password is missing');
        } else if (!data.email.includes("@") || data.email.split("@").length !=2) {
            alert('Not a valid email address. Try again');
        } else {
            login(data.email, data.password)
        }

    }

    render() {
        let login = this.props.login_form;
        if (this.props.current_user && this.props.current_user.token) {
            return (<Redirect to='/issues' />);
        } else {
            return (
                <Layout>
                <div>
                    <h3>
                        Log in Using Your Email
                    </h3>
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">
                            Email
                        </label>
                        <input type="email" name="email" className="form-control" value={login.email}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">
                            Password
                        </label>
                        <input type="password" name="password" className="form-control" value={login.password}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="btn-toolbar">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Log in</button>
                        <NavLink to='/register' className="btn btn-default">Register</NavLink>
                    </div>
                </div>
                </Layout>


            );
        }


    }
}

const mapStateToProps = state => {
    return {login_form: state.login_form, current_user: state.current_user};
};

const Login = connect(mapStateToProps)(LoginView);

export default Login;