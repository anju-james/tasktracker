import React from 'react';
import {NavLink} from 'react-router-dom';


class Issues extends React.Component {
    constructor(props) {
        super(props);
    }

    renderIssue() {
        return (this.props.issues.map((issue,index) =>
                <tr key={index}>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                    {this.props.showTime ?
                        <td>{issue.time_spent_mins ? issue.time_spent_mins + " mins" : ""}</td> : null}
                    {this.props.showCompleted ? <td>{issue.completed ? "True" : "False"}</td> : null}
                    <td className="text-right">
                        <div className="btn-toolbar float-right">
                        <NavLink className="btn btn-default btn-xs" to={"/issues/" + issue.id + "/show"}>Show</NavLink>
                        <NavLink className="btn btn-primary btn-xs" to={"/issues/" + issue.id + "/edit"}>Edit</NavLink>
                        </div>
                    </td>
                </tr>
            )
        );
    }

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th className="col-md-2">Title</th>
                    <th className="col-md-4">Description</th>
                    {this.props.showTime ? <th className="col-md-2">Minutes Spent</th> : null}
                    {this.props.showCompleted ? <th className="col-md-1">Completed</th> : null}
                    <th className="col-md-3 "></th>
                </tr>
                </thead>
                <tbody>
                {this.renderIssue()}
                </tbody>
            </table>
        );
    }

}


export default Issues;