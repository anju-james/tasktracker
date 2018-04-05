import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import {current_user, update_create_issue_form} from './actions';

import Layout from "./layout";



class CreateTaskView extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        store.dispatch(update_create_issue_form(data));
    }

    createIssue(issue,token) {
        let text = JSON.stringify({
            issue: issue,
            token: token
        });
        let title = issue.title;
        // reset form fields
        store.dispatch(update_create_issue_form({title: "", description: ""}));

        $.ajax('/api/v1/issues', {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: text,
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus + '- Creation failed. Reason:' + jqXHR.responseText)
            },success: (resp) => {
                alert("Issue - '"+title+ "' created successfully");
                this.props.history.push("/issues");
            },
        });
    };

    handleSubmit(ev) {
        ev.preventDefault();
        let issue = this.props.create_issue_form;
        if (issue.title && issue.title.trim().length > 0 && issue.description && issue.description.trim().length > 0) {
            this.createIssue(issue, this.props.current_user.token);
        } else {
            alert('Issue title and description cannot be empty');
        }

    }


    render() {
        if (!this.props.current_user || !this.props.current_user.token) {
            return (<Redirect to='/' />);
        }
        let issue = this.props.create_issue_form;
        return(
            <Layout>
            <div>
                <div className="form-group">
                    <label htmlFor="title" className="control-label">
                        Title
                    </label>
                    <input type="text" name="title" className="form-control" value={issue.title} onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="control-label">
                        Description
                    </label>
                    <input type="text" className="form-control" name="description" value={issue.description} onChange={this.handleChange}/>
                </div>
                <div className="btn-toolbar">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                    <NavLink className="btn btn-default" to='/issues'>Back</NavLink>
                </div>

            </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {create_issue_form: state.create_issue_form, current_user: state.current_user};
};
const CreateTask = connect(mapStateToProps)(CreateTaskView);
export default CreateTask;