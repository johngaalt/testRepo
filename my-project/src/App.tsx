import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem/TodoItem";
import { Tasks } from "./components/TodoItem.types";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  return (
    <>
      <TodoItem tasks={tasks} setTasks={setTasks} />
      <TodoList tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
