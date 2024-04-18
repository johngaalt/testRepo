import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Tasks } from "../TodoItem.types";
import { TodoListProps } from "./TodoList.types";

function TodoList({ tasks, setTasks }: TodoListProps) {
  const handleToggle = (task: Tasks) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, completed: !t.isCompleted };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (task: Tasks) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Stack display="flex" direction="column" alignItems="center">
        <List disablePadding>
          {tasks.map((task) => (
            <ListItem key={task.id} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.isCompleted}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${task.id}`,
                  }}
                  onChange={() => handleToggle(task)}
                />
              </ListItemIcon>
              <ListItemText
                id={`checkbox-list-label-${task.id}`}
                primary={task.text}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
}
export default TodoList;
