import {
    create_issue, fetched_issues, edit_issue,fetched_users,
    update_create_issue_form, update_register_form, current_user, update_login_form
} from './actions';
import store from './store';
import {empty_register_form, empty_login_form} from './store'

export function fetchIssuesforUser(user_id, token) {
    $.get("/api/v1/issues?user_id=" + user_id+"&token="+token, (response) => {
        let myissues = response.data.my_issues;
        let openissues = response.data.open_issues;
        store.dispatch(fetched_issues(myissues.concat(openissues)))
    });
}
export function fetchUsers(token) {
    $.get("/api/v1/users?token="+token, (response) => {
        let users = response.data;
        let usernames = users.map(user => ({id: user.id, name: user.name}));
        store.dispatch(fetched_users( _.sortBy(usernames,"name")));
    });
}



export function updateIssue(issue, token) {
    if (!issue) {
        return;
    }

    let text = JSON.stringify({
        id: issue.id,
        issue: issue,
        token: token
    });
    let title = issue.title;
    // reset form fields

    $.ajax('/api/v1/issues/'+issue.id, {
        method: "PUT",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + '- Login failed. Reason:' + jqXHR.responseText)
        },success: (resp) => {
            alert("Issue - '"+title+ "' updated successfully");
        },
    });
};


export function login(email, password) {
    let jsonData = JSON.stringify({
        name: email,
        pass: password
    });
    $.ajax('/api/v1/users', {
        method: "POST",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: jsonData,
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + '- Login failed. Reason:' + jqXHR.responseText)
        },success: (resp) => {
            store.dispatch(current_user(resp.data))
            store.dispatch(update_login_form(empty_login_form));
        }
    })
}



export function createUser(user, callback) {
    let jsonData = JSON.stringify({
        user: user,
    });
    let email = user.email;
    // reset form fields
    store.dispatch(update_register_form(empty_register_form));
    $.ajax('/api/v1/users', {
        method: "POST",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: jsonData,
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + '- Creating user failed. Reason:' + jqXHR.responseText)
        },success: (resp) => {
            alert("User account for  '"+email+ "' created successfully");
            callback();
        }
    });
}