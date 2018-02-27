defmodule Tasktracker.Repo.Migrations.AddRolesAndManagers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :role, :string, default: "user", null: false
      add :manager_id , :integer
    end
  end
end
