import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoListItemProps } from "./TodoListItem.types";

function TodoListItem({
  tasks: tasks,
  onToggle: handleToggle,
  onDelete: handleDelete,
}: TodoListItemProps) {
  return (
    <>
      <List disablePadding>
        {tasks.map((task) => (
          <ListItem key={`active-${task.id}`} dense>
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
    </>
  );
}

export default TodoListItem;
