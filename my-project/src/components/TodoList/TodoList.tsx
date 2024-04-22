import { Stack, Typography } from "@mui/material";
import { TodoListProps } from "./TodoList.types";
import TodoListItem from "../TodoListItem/TodoListItem";

function TodoList({
  activeTasks: activeTasks,
  onToggle: handleToggle,
  onDelete: handleDelete,
  doneTasks: doneTasks,
}: TodoListProps) {
  return (
    <>
      <Stack display="flex" direction="column" alignItems="center">
        <Typography variant="h5">Active</Typography>
        <TodoListItem
          tasks={activeTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </Stack>
      <Stack display="flex" direction="column" alignItems="center">
        <Typography variant="h5">Done</Typography>
        <TodoListItem
          tasks={doneTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </Stack>
    </>
  );
}
export default TodoList;
