import {createStore, combineReducers} from 'redux';
import {
    CREATE_ISSUE, FETCHED_ISSUES, EDIT_ISSUE, SIGNOUT, FETCHED_USERS,
    UPDATE_CREATE_ISSUE_FORM, UPDATE_REGISTER_FORM, UPDATE_LOGIN_FORM, AUTHENTICATED, UPDATE_EDIT_ISSUE_FORM
} from './actions';

/*
state = {
    issues: [...issues...]

    current_user: {}
    login_form: {
        email = ""
        password = ""
        },
    register_form: {
        name = ""
        email = ""
        password = ""
        confirmpassword = ""
        },
    create_issue_form: {
        title: "",
        description: ""
    },
    users: [],
    edit_issue_form: {}

 }
 */

function issues(state = [], action) {
    switch (action.type) {
        case FETCHED_ISSUES:
            return action.issues;
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case FETCHED_USERS:
            return action.users;
        default:
            return state;
    }
}

function current_user(state = {}, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return Object.assign({}, state, action.user);
        case SIGNOUT:
            return {};
        default :
            return state
    }
}

function create_issue_form(state = {title: "", description: ""}, action) {
    switch (action.type) {
        case UPDATE_CREATE_ISSUE_FORM:
            return Object.assign({}, state, action.field_change);
        default:
            return state;
    }
}

function edit_issue_form(state = {}, action) {
    switch (action.type) {
        case EDIT_ISSUE:
            return action.issue;
        case UPDATE_EDIT_ISSUE_FORM:
            return Object.assign({}, state, action.field_change);
        default:
            return state;
    }
}


export let empty_login_form = {
    email: "",
    password: "",
};


export let empty_register_form = {
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
};

function login_form(state = empty_login_form, action) {
    switch (action.type) {
        case UPDATE_LOGIN_FORM:
            return Object.assign({}, state, action.field_change);
        default:
            return state;
    }
}


function register_form(state = empty_register_form, action) {
    switch (action.type) {
        case UPDATE_REGISTER_FORM:
            return Object.assign({}, state, action.field_change);
        default:
            return state;
    }
}

const taskApp = combineReducers({
    issues, current_user, create_issue_form,
    register_form, login_form,users,edit_issue_form
});

let store = createStore(taskApp);
export default store;




