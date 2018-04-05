import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import {current_user, edit_issue, update_create_issue_form, update_edit_issue_form} from './actions';
import {createIssue, updateIssue} from './sevices';
import Layout from "./layout";

class EditTaskView extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reference_issue = null;
    }

    componentDidMount() {
        let issue = this.props.issues.find(issue => ""+issue.id == this.props.match.params.id);
        this.reference_issue = issue;
        if (issue) {
            store.dispatch(edit_issue(issue));
        }
    }


    handleChange(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        store.dispatch(update_edit_issue_form(data));
    }

    handleSubmit(ev) {
        ev.preventDefault();
        let issue = this.props.edit_issue_form;
        if (!issue.title || issue.title.trim().length == 0) {
            alert('Title is required');
        } else if (!issue.description || issue.description.trim().length == 0) {
            alert('Description is required');
        } else if (""+issue.completed == "true" &&
            (!issue.time_spent_mins || !(/^\+?(0|[1-9]\d*)$/.test(issue.time_spent_mins))
                || (parseInt(issue.time_spent_mins) % 15) != 0)) {
            alert("Time taken should be an increment of 15 minutes for a completed task");
        } else if (issue.time_spent_mins && (""+issue.time_spent_mins).trim().length > 0
            && (!(/^\+?(0|[1-9]\d*)$/.test(issue.time_spent_mins)) || (parseInt(issue.time_spent_mins) % 15) != 0)) {
            alert("Time spend is not valid. Should be in increments of 15 minutes");
        } else if(JSON.stringify(this.reference_issue) === JSON.stringify(issue) ) {
            alert('No changes to update');
        } else {
            updateIssue(issue, this.props.current_user.token);
        }

    }


    render() {
        if (!this.props.current_user || !this.props.current_user.token) {
            return (<Redirect to='/' />);
        }

        if (!this.props.edit_issue_form.id) {
            return(<div></div>);
        }

        let issue = this.props.edit_issue_form;
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
                    <div className="form-group">
                        <label htmlFor="time_spent_mins" className="control-label">
                            Time-spent(mins)
                        </label>
                        <input type="text" className="form-control" name="time_spent_mins" value={issue.time_spent_mins ? issue.time_spent_mins: "" } onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user_id" className="control-label">
                            User
                        </label>
                        <div>
                        <select value={issue.user_id ? issue.user_id: "" } name="user_id" onChange={this.handleChange}>
                            <option value=""></option>
                            {this.props.users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="completed" className="control-label">
                            Completed
                        </label>
                        <div>
                            <select name="completed" value={issue.completed} onChange={this.handleChange}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
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
    return {
        current_user: state.current_user,
        issues: state.issues,
        edit_issue_form: state.edit_issue_form,
        users: state.users
    };
};
const EditTask = connect(mapStateToProps)(EditTaskView);
export default EditTask;