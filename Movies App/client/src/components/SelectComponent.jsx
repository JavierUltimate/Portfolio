import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";

export default function SelectComponent() {
  const [roll, setRoll] = React.useState("");
  const { register } = useForm();
  const handleChange = (event) => {
    setRoll(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Roll</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roll}
          {...register("roll", { required: true })}
          label="roll"
          onChange={handleChange}
        >
          <MenuItem value={"Admin"}>Admin</MenuItem>
          <MenuItem value={"User"}>User</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
