export interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  isActive: boolean;
}
export interface TodoItemProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
