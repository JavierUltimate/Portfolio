import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Divider, Typography } from "@mui/material";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import { useAuth } from "../context/AuthContext";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signIn, isAuthenticated, err,isAdmin } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signIn(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/movie");
  }, [isAuthenticated]);



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
          Login
          <KeyIcon />
        </Typography>
        <Divider />

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
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 2,
          }}
          startIcon={<HowToRegIcon />}
        >
          Login
        </Button>
        <Typography className="mt-10" variant="p">
          Do you have an account?{" "}
          <Link className="text-blue-600" to="/register">
            Sign Up
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
