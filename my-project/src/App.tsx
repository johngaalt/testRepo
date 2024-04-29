import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem/TodoItem";
import { Task } from "./components/TodoItem.types";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const handleToggle = (toggledTask: Task) => {
    if (toggledTask.isCompleted) {
      setDoneTasks(doneTasks.filter((task) => task.id !== toggledTask.id));
      setActiveTasks([...activeTasks, { ...toggledTask, isCompleted: false }]);
    } else {
      setActiveTasks(activeTasks.filter((task) => task.id !== toggledTask.id));
      setDoneTasks([...doneTasks, { ...toggledTask, isCompleted: true }]);
    }
  };

  const handleDelete = ({ id, isCompleted }: Task) => {
    if (isCompleted) {
      setDoneTasks(doneTasks.filter((task) => task.id !== id));
    } else {
      setActiveTasks(activeTasks.filter((task) => task.id !== id));
    }
  };

  return (
    <>
      <TodoItem tasks={activeTasks} setTasks={setActiveTasks} />
      <TodoList
        activeTasks={activeTasks}
        doneTasks={doneTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        setActiveTasks={setActiveTasks}
        setDoneTasks={setDoneTasks}
      />
    </>
  );
}

export default App;
