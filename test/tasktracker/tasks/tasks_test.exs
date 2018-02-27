defmodule Tasktracker.TasksTest do
  use Tasktracker.DataCase

  alias Tasktracker.Tasks

  describe "issues" do
    alias Tasktracker.Tasks.Issue

    @valid_attrs %{completed: true, description: "some description", time_spent_mins: 42, title: "some title"}
    @update_attrs %{completed: false, description: "some updated description", time_spent_mins: 43, title: "some updated title"}
    @invalid_attrs %{completed: nil, description: nil, time_spent_mins: nil, title: nil}

    def issue_fixture(attrs \\ %{}) do
      {:ok, issue} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_issue()

      issue
    end

    test "list_issues/0 returns all issues" do
      issue = issue_fixture()
      assert Tasks.list_issues() == [issue]
    end

    test "get_issue!/1 returns the issue with given id" do
      issue = issue_fixture()
      assert Tasks.get_issue!(issue.id) == issue
    end

    test "create_issue/1 with valid data creates a issue" do
      assert {:ok, %Issue{} = issue} = Tasks.create_issue(@valid_attrs)
      assert issue.completed == true
      assert issue.description == "some description"
      assert issue.time_spent_mins == 42
      assert issue.title == "some title"
    end

    test "create_issue/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_issue(@invalid_attrs)
    end

    test "update_issue/2 with valid data updates the issue" do
      issue = issue_fixture()
      assert {:ok, issue} = Tasks.update_issue(issue, @update_attrs)
      assert %Issue{} = issue
      assert issue.completed == false
      assert issue.description == "some updated description"
      assert issue.time_spent_mins == 43
      assert issue.title == "some updated title"
    end

    test "update_issue/2 with invalid data returns error changeset" do
      issue = issue_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_issue(issue, @invalid_attrs)
      assert issue == Tasks.get_issue!(issue.id)
    end

    test "delete_issue/1 deletes the issue" do
      issue = issue_fixture()
      assert {:ok, %Issue{}} = Tasks.delete_issue(issue)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_issue!(issue.id) end
    end

    test "change_issue/1 returns a issue changeset" do
      issue = issue_fixture()
      assert %Ecto.Changeset{} = Tasks.change_issue(issue)
    end
  end

  describe "timeblocks" do
    alias Tasktracker.Tasks.TimeBlock

    @valid_attrs %{endtime: ~N[2010-04-17 14:00:00.000000], starttime: ~N[2010-04-17 14:00:00.000000], task_id: 42}
    @update_attrs %{endtime: ~N[2011-05-18 15:01:01.000000], starttime: ~N[2011-05-18 15:01:01.000000], task_id: 43}
    @invalid_attrs %{endtime: nil, starttime: nil, task_id: nil}

    def time_block_fixture(attrs \\ %{}) do
      {:ok, time_block} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_time_block()

      time_block
    end

    test "list_timeblocks/0 returns all timeblocks" do
      time_block = time_block_fixture()
      assert Tasks.list_timeblocks() == [time_block]
    end

    test "get_time_block!/1 returns the time_block with given id" do
      time_block = time_block_fixture()
      assert Tasks.get_time_block!(time_block.id) == time_block
    end

    test "create_time_block/1 with valid data creates a time_block" do
      assert {:ok, %TimeBlock{} = time_block} = Tasks.create_time_block(@valid_attrs)
      assert time_block.endtime == ~N[2010-04-17 14:00:00.000000]
      assert time_block.starttime == ~N[2010-04-17 14:00:00.000000]
      assert time_block.task_id == 42
    end

    test "create_time_block/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_time_block(@invalid_attrs)
    end

    test "update_time_block/2 with valid data updates the time_block" do
      time_block = time_block_fixture()
      assert {:ok, time_block} = Tasks.update_time_block(time_block, @update_attrs)
      assert %TimeBlock{} = time_block
      assert time_block.endtime == ~N[2011-05-18 15:01:01.000000]
      assert time_block.starttime == ~N[2011-05-18 15:01:01.000000]
      assert time_block.task_id == 43
    end

    test "update_time_block/2 with invalid data returns error changeset" do
      time_block = time_block_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_time_block(time_block, @invalid_attrs)
      assert time_block == Tasks.get_time_block!(time_block.id)
    end

    test "delete_time_block/1 deletes the time_block" do
      time_block = time_block_fixture()
      assert {:ok, %TimeBlock{}} = Tasks.delete_time_block(time_block)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_time_block!(time_block.id) end
    end

    test "change_time_block/1 returns a time_block changeset" do
      time_block = time_block_fixture()
      assert %Ecto.Changeset{} = Tasks.change_time_block(time_block)
    end
  end
end
