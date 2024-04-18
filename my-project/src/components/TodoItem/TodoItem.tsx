import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Tasks } from "../TodoItem.types";
import { Button, Stack } from "@mui/material";

function TodoItem() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
      isActive: true,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          color: "grey",
          fontWeight: "bold",
          fontSize: "50px",
        }}
      >
        TODOS
      </Typography>
      <Stack
        component="form"
        display={"flex"}
        justifyContent={"center"}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleAddTask(e)}
        spacing={2}
        direction={"row"}
      >
        <TextField
          id="filled-basic"
          label="Add a task"
          variant="filled"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>
    </>
  );
}

export default TodoItem;
