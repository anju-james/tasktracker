import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, Switch, HashRouter} from 'react-router-dom';
import Tasks from "./tasks";
import TaskDetails from "./task-details";
import CreateTask from './create-task'
import Register from './register'
import Login from "./login";
import {connect} from "react-redux";
import EditTask from "./edit-task";

class Tasktracker extends React.Component {

    render() {
        return(
            <div>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>>
                    <Route exact path='/register' component={Register}/>>
                    <Route exact path='/issues' component={Tasks}/>
                    <Route exact path='/issues/create' component={CreateTask}/>>
                    <Route path='/issues/:id/show' component={TaskDetails}/>
                    <Route path='/issues/:id/edit' component={EditTask} />
                </Switch>
            </HashRouter>
            </div>
        );
    }
}



export default Tasktracker;