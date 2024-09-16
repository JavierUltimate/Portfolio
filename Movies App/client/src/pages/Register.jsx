import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Divider, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import { useAuth } from "../context/AuthContext";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CircularProgress from "@mui/material/CircularProgress";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Register() {
  const [roll, setRoll] = React.useState("");
  const handleChange = (event) => {
    setRoll(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signUp, isAuthenticated, err } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
    return navigate("/movie");
  });

  useEffect(() => {
    if (err) {
      setTimeout(() => {}, 2000);
    }
  }, [err]);
  return (
    <div className="bg-[url('/assets/fondo.jpg')] bg-cover bg-center w-[100%] min-h-[100vh]  p-2 rounded-md flex justify-center items-center">
      
      <form
        onSubmit={onSubmit}
        className="backdrop-blur backdrop-filter  bg-opacity-70 bg-gray/60 flex flex-col gap-2 border-2 p-10 max-w-md w-full rounded-md border-transparent shadow-lg"
      >
        <Typography
          variant="p"
          className="w-full flex items-center justify-between font-bold text-xl"
        >
          Register
          <KeyIcon />
        </Typography>
        <Divider />
        <TextField
          className="border-2 rounded-md pl-2  "
          type="text"
          placeholder="User name"
          {...register("username", { required: true })}
          label="User name"
          variant="outlined"
        />

        {errors.username && (
          <p className="text-red-500">User name is required</p>
        )}
        <TextField
          className="border-2 rounded-md pl-2 "
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          label="Email"
          variant="outlined"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <TextField
          className="border-2 rounded-md pl-2 "
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          label="Password"
          variant="outlined"
        />

        {errors.email && <p className="text-red-500">Password is required</p>}
       

        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Roll</InputLabel>
        <Select
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
    {errors.roll && <p className="text-red-500">Roll is required</p>}

        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 2,
          }}
          startIcon={<AppRegistrationIcon />}
        >
          Register
        </Button>
        <Typography className="mt-10" variant="p">
          Already Have an Account?{" "}
          <Link className="text-blue-600" to="/login">
            Sign In
          </Link>
        </Typography>
        {err &&
          err.map((item, i) => (
            <p
              key={i}
              className="bg-red-500 text-center p-2 rounded-md text-white"
            >
              {item}
            </p>
          ))}
      </form>
    </div>
  );
}
