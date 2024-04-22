import { Divider, Stack, Typography } from "@mui/material";
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
      <Stack
        display="flex"
        direction="row"
        justifyContent={"center"}
        columnGap={10}
      >
        <Stack
          display="flex"
          direction="column"
          justifyContent={"space-between"}
        >
          <Typography variant="h5" textAlign={"center"} color={"primary"}>
            Active
          </Typography>
          <TodoListItem
            tasks={activeTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack display="flex" direction="column">
          <Typography variant="h5" textAlign={"center"} color={"gray"}>
            Done
          </Typography>
          <TodoListItem
            tasks={doneTasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </Stack>
      </Stack>
    </>
  );
}
export default TodoList;
