defmodule TasktrackerWeb.IssueView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.IssueView

  def render(
        "index.json",
        %{open_issues: open_issues, my_issues: my_issues}
      ) do


    %{
      data: %{
        open_issues: render_many(open_issues, IssueView, "issue.json"),
        my_issues: render_many(my_issues, IssueView, "issue.json"),
      }
    }
  end

  def render("show.json", %{issue: issue, user: user}) do
    if user do
      data = Map.merge(render_one(issue, IssueView, "issue.json"), %{user_name: user.name})
    else
      data = render_one(issue, IssueView, "issue.json")
    end
    %{data: data}
  end

  def render("issue.json", %{issue: issue}) do
    %{
      id: issue.id,
      completed: issue.completed,
      description: issue.description,
      time_spent_mins: issue.time_spent_mins,
      title: issue.title,
      user_id: issue.user_id
    }
  end

end