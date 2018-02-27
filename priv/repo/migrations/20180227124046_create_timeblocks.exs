defmodule Tasktracker.Repo.Migrations.CreateTimeblocks do
  use Ecto.Migration

  def change do
    create table(:timeblocks) do
      add :task_id, references(:issues, on_delete: :nothing)
      add :starttime, :naive_datetime
      add :endtime, :naive_datetime
      timestamps()
    end

  end
end
