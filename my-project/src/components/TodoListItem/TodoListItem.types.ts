import { Task } from "../TodoItem.types";

export interface TodoListItemProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}
