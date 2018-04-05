import React from 'react';
import Issues from './issues';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import {NavLink as RouterNavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchIssuesforUser, fetchUsers} from './sevices'
import Layout from "./layout";


import classnames from 'classnames';

class TasksView extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    componentDidMount() {
        if (this.props.current_user && this.props.current_user.id) {
            fetchIssuesforUser(this.props.current_user.id,this.props.current_user.token);
            fetchUsers(this.props.current_user.token);
        }
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (!this.props.current_user || !this.props.current_user.token) {
            return (<Redirect to='/' />);
        }

        let myissues = [];
        let openissues = [];
        let issues = this.props.issues;
        let current_user = this.props.current_user;

        if (current_user && current_user.id) {
            myissues = issues.filter(issue => issue.user_id && issue.user_id == current_user.id);
            openissues =  issues.filter(issue => !myissues.includes(issue));
        }
        return (
            <Layout>
            <div>
                <h2>
                    Tasks
                </h2>
                <div className="row pull-right">
                    <span className="pull-right">
                        <RouterNavLink to="/issues/create" className="btn btn-success">Create Task</RouterNavLink>
                    </span>
                </div>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            My Tasks
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Unassigned Tasks
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Issues issues={myissues} showTime={true} showCompleted={true} />
                    </TabPane>
                    <TabPane tabId="2">
                        <Issues issues={openissues} showTime={false} showCompleted={false} />
                    </TabPane>
                </TabContent>
            </div></Layout>);
    }
}

const mapStateToProps = state => {
    return {
        issues: state.issues,
        current_user: state.current_user
    };
};

const Tasks = connect(
    mapStateToProps
)(TasksView);
export default Tasks;
