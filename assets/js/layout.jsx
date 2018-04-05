import React from 'react'
import {NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import store from './store'
import {signout_user} from './actions'
class LayoutView extends React.Component{

    constructor(props) {
        super(props);
        this.signout = this.signout.bind(this);
    }

    signout() {
        store.dispatch(signout_user());
    }

    render() {
        return (<div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <NavLink to="/" className="navbar-brand text-dark"><strong>Task Tracker</strong></NavLink>
            </h5>
            {this.props.current_user && this.props.current_user.token ?
                <div className="btn-toolbar">
                <nav className="btn btn-outline-default">
                    Logged in as: <strong>{this.props.current_user.name}</strong>
                </nav>
                <nav onClick={this.signout} className="btn btn-outline-primary">Sign out</nav>
                </div>
                : "Not logged in."
            }
        </div>
            {this.props.children}
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        current_user: state.current_user
    };
};

const Layout = connect(
    mapStateToProps
)(LayoutView);

export default Layout;