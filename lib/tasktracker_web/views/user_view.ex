defmodule TasktrackerWeb.UserView do
  use TasktrackerWeb, :view

  alias TasktrackerWeb.UserView

  def render("user.json", %{user: user}) do
    %{
      email: user.email,
      name: user.name,
      role: user.role,
      manager_id: user.manager_id,
      id: user.id
    }
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("token.json", %{user: user, token: token}) do
    %{
      data: Map.merge(render_one(user, UserView, "user.json"),
        %{token: token})
    }
  end



end
