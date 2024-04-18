import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Input() {
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="on"
      >
        <TextField id="filled-basic" label="Add a task" variant="filled" />
      </Box>
    </>
  );
}

export default Input;
