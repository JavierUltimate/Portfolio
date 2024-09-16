import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Button, Divider, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { useMovie } from "../context/MovieContext";
import EditIcon from "@mui/icons-material/Edit";
export default function MovieFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, err } = useAuth();
  const { createMovies, err: MovieError } = useMovie();
  const args = useParams();
  const { getMovieContext, updateMovieContext } = useMovie();

  useEffect(() => {
    async function charge() {
      if (args.id) {
        const res = await getMovieContext(args.id);
        setValue("title", res.title);
        setValue("description", res.description);
        setValue("author", res.author);
        setValue("company", res.company);
      } else {
        setValue("title", "");
        setValue("description", "");
        setValue("author", "");
        setValue("company", "");
      }
    }
    charge();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    if (args.id) {
      updateMovieContext(args.id, values);
      return navigate("/movie");
    } else {
      const res = await createMovies(values);
      console.log(res);
      return navigate("/movie");
    }
  });
  return (
    <div className="bg-[url('/assets/fondo.jpg')] bg-cover bg-center w-[100%] min-h-[100vh]  p-2 rounded-md flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="backdrop-blur backdrop-filter  bg-opacity-70 bg-gray/60 flex flex-col gap-2 border-2 p-10 max-w-md w-full rounded-md border-transparent shadow-lg"
      >
        {args.id ? (
          <Typography
            variant="p"
            className="w-full flex items-center justify-between font-bold text-xl"
          >
            Update Movie
            <CameraAltIcon />
          </Typography>
        ) : (
          <Typography
            variant="p"
            className="w-full flex items-center justify-between font-bold text-xl"
          >
            Add Movie
            <CameraAltIcon />
          </Typography>
        )}

        <Divider />
        <TextField
          className="border-2 rounded-md pl-2  "
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          variant="outlined"
        />

        {errors.title && <p className="text-red-500">Title is required</p>}
        <TextField
          className="border-2 rounded-md pl-2 "
          type="textarea"
          placeholder="Description"
          {...register("description", { required: true })}
          variant="outlined"
          multiline
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}
        <TextField
          className="border-2 rounded-md pl-2 "
          type="text"
          placeholder="Author"
          {...register("author", { required: true })}
          variant="outlined"
        />

        {errors.author && <p className="text-red-500">Author is required</p>}
        <TextField
          className="border-2 rounded-md pl-2 "
          type="text"
          placeholder="Company"
          {...register("company", { required: true })}
          variant="outlined"
        />

        {errors.company && <p className="text-red-500">Company is required</p>}

        {args.id ? (
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
            }}
            startIcon={<EditIcon />}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
            }}
            startIcon={<AddModeratorIcon />}
          >
            Add
          </Button>
        )}

        {err &&
          err.map((item, i) => (
            <p
              key={i}
              className="bg-red-500 text-center p-2 rounded-md text-white"
            >
              {item}
            </p>
          ))}
        {MovieError &&
          MovieError.map((item, i) => (
            <p key={i} className="text-white rounded-md p-2 bg-red-500">
              {item}
            </p>
          ))}
      </form>
    </div>
  );
}
