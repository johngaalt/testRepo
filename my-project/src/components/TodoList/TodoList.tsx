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
import { TodoListProps } from "./TodoList.types";

function TodoList({
  activeTasks: tasks,
  setActiveTasks: setActiveTasks,
  onToggle: handleToggle,
  onDelete: handleDelete,
  setDoneTasks: setDoneTasks,
  doneTasks: doneTasks,
}: TodoListProps) {
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
