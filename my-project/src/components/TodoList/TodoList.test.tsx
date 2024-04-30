import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("TodoList", () => {
  const activeTasks = [
    { id: 1, text: "Task 1", isCompleted: false, isActive: true },
    { id: 2, text: "Task 2", isCompleted: false, isActive: true },
  ];
  const doneTasks = [
    { id: 3, text: "Task 3", isCompleted: true, isActive: false },
    { id: 4, text: "Task 4", isCompleted: true, isActive: false },
  ];

  const handleToggle = jest.fn();
  const handleDelete = jest.fn();

  beforeEach(() => {
    render(
      <TodoList
        activeTasks={activeTasks}
        doneTasks={doneTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />,
    );
  });

  it("should render active tasks", () => {
    activeTasks.forEach((task) => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  it("should render done tasks", () => {
    doneTasks.forEach((task) => {
      expect(screen.getByText(task.text)).toBeInTheDocument();
    });
  });

  it("should call onToggle when a task is toggled", async () => {
    const task = activeTasks[0];

    const [checkbox] = screen.getAllByRole("checkbox");
    await userEvent.click(checkbox);

    expect(handleToggle).toHaveBeenCalledWith(task);
  });

  it("should call onDelete when a task is deleted", async () => {
    const task = activeTasks[0];

    const [deleteButton] = screen.getAllByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith(task);
  });
});
