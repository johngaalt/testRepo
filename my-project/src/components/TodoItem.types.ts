export interface Tasks {
  id: number;
  text: string;
  isCompleted: boolean;
  isActive: boolean;
}
export interface TodoItemProps {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
  task?: Tasks;
}
