export const CREATE_ISSUE = 'CREATE_ISSUE';
export const EDIT_ISSUE = 'EDIT_ISSUE';
export const FETCHED_ISSUES  = 'FETCHED_ISSUES';
export const FETCHED_USERS  = 'FETCHED_USERS';
export const UPDATE_CREATE_ISSUE_FORM = 'UPDATE_CREATE_ISSUE_FORM';
export const UPDATE_EDIT_ISSUE_FORM = 'UPDATE_EDIT_ISSUE_FORM';
export const UPDATE_REGISTER_FORM = 'UPDATE_REGISTER_FORM';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const AUTHENTICATED = 'AUTHENTICATED';
export const SIGNOUT = 'SIGNOUT';

export function current_user(user) {
    return { type: AUTHENTICATED, user: user }
}

export function signout_user() {
    return { type: SIGNOUT }
}

export function create_issue(issue) {
    return { type: CREATE_ISSUE, issue: issue }
}

export function edit_issue(issue) {
    return { type: EDIT_ISSUE, issue: issue }
}

export function fetched_issues(issues) {
    return { type: FETCHED_ISSUES, issues: issues}
}


export function fetched_users(users) {
    return { type: FETCHED_USERS, users: users}
}

export  function update_create_issue_form(field_change) {
    return { type: UPDATE_CREATE_ISSUE_FORM, field_change: field_change}
}

export  function update_edit_issue_form(field_change) {
    return { type: UPDATE_EDIT_ISSUE_FORM, field_change: field_change}
}

export  function update_register_form(field_change) {
    return { type: UPDATE_REGISTER_FORM, field_change: field_change}
}

export  function update_login_form(field_change) {
    return { type: UPDATE_LOGIN_FORM, field_change: field_change}
}