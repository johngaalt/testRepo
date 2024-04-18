import { Tasks } from "../TodoItem.types";

export interface TodoListProps {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
}
