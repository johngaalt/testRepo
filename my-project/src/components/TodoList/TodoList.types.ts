import { Task } from "../TodoItem.types";

export interface TodoListProps {
  activeTasks: Task[];
  doneTasks: Task[];
  onDelete: (task: Task) => void;
  onToggle: (task: Task) => void;
  setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setDoneTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
