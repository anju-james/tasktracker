defmodule TasktrackerWeb.UserController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.User

  action_fallback TasktrackerWeb.FallbackController


  def index(conn, %{"token" => token}) do
    case Phoenix.Token.verify(conn, "auth token", token, max_age: 86400) do
      {:ok, _user_id} ->
        users = Accounts.list_users()
        render(conn, "index.json", users: users)
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      render(conn, "show.json", user: user)
    end

  end

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Accounts.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end

end