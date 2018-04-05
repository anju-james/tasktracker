defmodule TasktrackerWeb.IssueController do
  use TasktrackerWeb, :controller

  action_fallback TasktrackerWeb.FallbackController

  alias Tasktracker.Tasks
  alias Tasktracker.Accounts
  alias Tasktracker.Tasks.Issue


  def index(conn, %{"user_id" => user_id, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, _user_id} ->
        issues = Tasks.list_issues()
        curr_user_id = String.to_integer(user_id)
        my_issues = issues
                    |> Enum.filter(fn issue -> curr_user_id == issue.user_id end)
        open_issues = issues
                      |> Enum.filter(fn issue -> !issue.completed && issue.user_id == nil end)

        render(
          conn,
          "index.json",
          open_issues: open_issues,
          my_issues: my_issues
        )
    end
  end

  def show(conn, %{"id" => id, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, _user_id} ->
        issue = Tasks.get_issue!(String.to_integer(id))
        user = Accounts.get_user(issue.user_id)
        render(conn, "show.json", issue: issue, user: user)
    end
  end

  def create(conn, %{"issue" => issue_params, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, _user_id} ->
        with {:ok, %Issue{} = issue} <- Tasks.create_issue(issue_params) do
          user = Accounts.get_user(issue.user_id || -1)
          render(conn, "show.json", issue: issue, user: user)
        end
    end
  end

  def update(conn, %{"id" => id, "issue" => issue_params, "token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, _user_id} ->
        issue = Tasks.get_issue!(String.to_integer(id))
        case Tasks.update_issue(issue, issue_params) do
          {:ok, issue} ->
            render(conn, "show.json", issue: issue, user: nil)
        end
    end
  end

end