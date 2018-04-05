import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import Layout from "./layout";



class TaskDetailsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.current_user || !this.props.current_user.token) {
            return (<Redirect to='/' />);
        }

        let issue = this.props.issues.find(issue => issue.id == this.props.match.params.id);
        if (!issue) {
            return(<div></div>);
        } else {
            let edit_path = '/issues/' + issue.id+'/edit';
            let assigned_user = this.props.users.find(user => issue.id && user.id == issue.user_id)

            return (
                <Layout>
                <div>
                    <h2>Task Details</h2>

                    <div className="card">
                        <div className="card-block">
                            <h4 className="card-title">{issue.title}</h4>
                            <p className="card-text"><strong>Description:</strong>{issue.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Time
                                Spent: </strong>{issue.time_spent_mins ? issue.time_spent_mins + " mins" : ""}</li>
                            <li className="list-group-item"><strong>Assigned User: </strong>{ assigned_user ? assigned_user.name : "Unassigned"}</li>
                            <li className="list-group-item"><strong>Completed: </strong>{issue.completed ? "Yes" : "No"}</li>
                        </ul>
                        <div className="card-block">
                            <div className="btn-toolbar">
                            <NavLink className="btn btn-primary" to={edit_path}>Edit</NavLink>
                            <NavLink className="btn btn-default" to='/issues'>Back</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                </Layout>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
       issues: state.issues,
        current_user: state.current_user,
        users: state.users
    };
};

const TaskDetails = connect(mapStateToProps)(TaskDetailsView);

export default TaskDetails;