defmodule TasktrackerWeb.TimeBlockView do
  use TasktrackerWeb, :view
  alias TasktrackerWeb.TimeBlockView

  def render("index.json", %{timeblocks: timeblocks}) do
    %{data: render_many(timeblocks, TimeBlockView, "time_block.json")}
  end

  def render("show.json", %{time_block: time_block}) do
    %{data: render_one(time_block, TimeBlockView, "time_block.json")}
  end

  def render("time_block.json", %{time_block: time_block}) do
    %{id: time_block.id,
      task_id: time_block.task_id,
      starttime: time_block.starttime,
      endtime: time_block.endtime}
  end
end
