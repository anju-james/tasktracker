defmodule Tasktracker.Tasks.TimeBlock do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker.Tasks.TimeBlock


  schema "timeblocks" do
    field :endtime, :naive_datetime
    field :starttime, :naive_datetime
    field :task_id, :integer

    timestamps()
  end

  @doc false
  def changeset(%TimeBlock{} = time_block, attrs) do
    time_block
    |> cast(attrs, [:task_id, :starttime, :endtime])
    |> validate_required([:task_id, :starttime, :endtime])
  end
end
