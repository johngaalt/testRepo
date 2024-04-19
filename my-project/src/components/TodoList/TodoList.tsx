import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../TodoItem.types";
import { TodoListProps } from "./TodoList.types";

function TodoList({ tasks, setTasks }: TodoListProps) {
  const handleToggle = (task: Task) => {
    const updatedTasks = tasks.map((t) => {
      console.log("t.id:", t.id, "task.id:", task.id);
      if (t.id === task.id) {
        return { ...t, completed: !t.isCompleted };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (task: Task) => {
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
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(task)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
}
export default TodoList;
