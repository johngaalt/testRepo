import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("TodoItem", () => {
  it("should render without crashing", () => {
    render(<TodoItem tasks={[]} setTasks={() => {}} />);
  });

  it("should display correct typography text", () => {
    render(<TodoItem tasks={[]} setTasks={() => {}} />);

    const typographyElement = screen.getByText(/TODOS/i);

    expect(typographyElement).toBeInTheDocument();
  });

  it("should have correct textfield label", () => {
    render(<TodoItem tasks={[]} setTasks={() => {}} />);

    const textFieldElement = screen.getByLabelText(/Add a task/i);

    expect(textFieldElement).toBeInTheDocument();
  });

  it("should have correct button text", () => {
    render(<TodoItem tasks={[]} setTasks={() => {}} />);

    const buttonElement = screen.getByRole("button", { name: /Add/i });

    expect(buttonElement).toBeInTheDocument();
  });

  it("should call handleAddTask when form is submitted", async () => {
    const handleAddTask = jest.fn();
    render(<TodoItem tasks={[]} setTasks={handleAddTask} />);

    const input = screen.getByLabelText(/Add a task/i);
    await userEvent.type(input, "New task");

    const button = screen.getByRole("button", { name: /Add/i });
    await userEvent.click(button);

    expect(handleAddTask).toHaveBeenCalled();
  });

  it("should update state when input value changes and submit form", async () => {
    const setTasks = jest.fn();
    render(<TodoItem tasks={[]} setTasks={setTasks} />);

    const textFieldElement = screen.getByLabelText(/Add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(textFieldElement, "New task");
    await userEvent.click(addButton);

    expect(setTasks).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          text: "New task",
          isCompleted: false,
          isActive: true,
        }),
      ]),
    );
  });
});
