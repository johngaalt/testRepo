import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component Unit Tests", () => {
  it("should allow a user to add a task", async () => {
    render(<App />);
    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    expect(screen.queryByText("New Task")).toBeInTheDocument();
  });

  it("should check checkbox when a task is added and completed", async () => {
    render(<App />);
    const input = screen.getByLabelText<HTMLInputElement>(/add a task/i);
    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("should check checkbox when a task is added and not completed", async () => {
    render(<App />);
    const input = screen.getByLabelText<HTMLInputElement>(/add a task/i);
    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("should delete task from list when task is completed", async () => {
    render(<App />);
    const input = screen.getByLabelText<HTMLInputElement>(/add a task/i);
    const addButton = screen.getByRole<HTMLButtonElement>("button", {
      name: /add/i,
    });

    await userEvent.type(input, "New Task");
    await userEvent.click(addButton);

    const deleteButton = screen.getByLabelText<HTMLButtonElement>("delete");
    await userEvent.click(deleteButton);

    expect(screen.queryByText("New Task")).toBeNull();
  });
});
