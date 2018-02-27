defmodule TasktrackerWeb.UserController do
  use TasktrackerWeb, :controller

  alias Tasktracker.Accounts
  alias Tasktracker.Accounts.User

  def index(conn, _params) do
    if (!conn.assigns[:current_user] || conn.assigns[:current_user].role != "admin") do
      conn
      |> put_flash(:error, "Missing admin privileges.")
      |> redirect(to: issue_path(conn, :index))
    else
      users = Accounts.list_users()
      render(conn, "index.html", users: users)
    end
  end

  def new(conn, _params) do
    changeset = Accounts.change_user(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, _user} ->
        conn
        |> put_flash(:info, "User created successfully. Login using the email.")
        |> redirect(to: page_path(conn, :index))
      #|> redirect(to: session_path(conn, :create, :post, %{"email" => user.email}))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    if (!conn.assigns[:current_user] || conn.assigns[:current_user].role != "admin") do
      conn
      |> put_flash(:error, "Missing admin privileges.")
      |> redirect(to: issue_path(conn, :index))
    else
      user = Accounts.get_user!(id)
      manager = Accounts.get_user(user.manager_id || -1)
      render(conn, "show.html", user: user, manager: manager)
    end
  end

  def edit(conn, %{"id" => id}) do
    if (!conn.assigns[:current_user] || conn.assigns[:current_user].role != "admin") do
      conn
      |> put_flash(:error, "Missing admin privileges.")
      |> redirect(to: issue_path(conn, :index))
    else
      user = Accounts.get_user!(id)
      changeset = Accounts.change_user(user)
      render(conn, "edit.html", user: user, changeset: changeset, users: Accounts.list_users)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    if (!conn.assigns[:current_user] || conn.assigns[:current_user].role != "admin") do
      conn
      |> put_flash(:error, "Missing admin privileges.")
      |> redirect(to: issue_path(conn, :index))
    else
      user = Accounts.get_user!(id)

      case Accounts.update_user(user, user_params) do
        {:ok, user} ->
          conn
          |> put_flash(:info, "User updated successfully.")
          |> redirect(to: user_path(conn, :show, user))
        {:error, %Ecto.Changeset{} = changeset} ->
          render(conn, "edit.html", user: user, changeset: changeset)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    if (!conn.assigns[:current_user] || conn.assigns[:current_user].role != "admin") do
      conn
      |> put_flash(:error, "Missing admin privileges.")
      |> redirect(to: issue_path(conn, :index))
    else
      user = Accounts.get_user!(id)
      {:ok, _user} = Accounts.delete_user(user)

      conn
      |> put_flash(:info, "User deleted successfully.")
      |> redirect(to: user_path(conn, :index))
    end
  end

  def team(conn, _) do
    if conn.assigns[:current_user] do
      current_user = conn.assigns[:current_user]
      manager = Accounts.get_user(current_user.manager_id || -1)
      teams = Accounts.get_team(current_user.id)
      render(conn, "team.html", manager: manager, teams: teams)
    else
      conn
      |> put_flash(:info, "Login before viewing the team.")
      |> redirect(to: page_path(conn, :index))
    end
  end
end
