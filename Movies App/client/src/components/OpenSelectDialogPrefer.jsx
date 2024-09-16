import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

export default function OpenSelectDialogPrefer() {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const { getMovieByUser } = useMovie();
  const { users } = useAuth();
  const navigate = useNavigate();
  const { movie, setMovie } = useMovie();

  const handleChange = async (event) => {
    alert(event.target.value);
    const res = await getMovieByUser(event.target.value);
    setId(event.target.value);
    setMovie(res);
    console.log(movie);
    navigate(`/dashboard/${event.target.value}`);
  };

  React.useEffect(() => {
    const createNew = async (event) => {
      alert(event.target.value);
      const res = await getMovieByUser(event.target.value);

      setId(event.target.value);
      setMovie(res);
      console.log(movie);
      navigate(`/dashboard/${event.target.value}`);
    };
    createNew();
  }, [movie]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<ContentPasteSearchIcon />}
      >
        Search For User
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle className="font-bold ">Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <InputLabel htmlFor="demo-dialog-native">Email</InputLabel>
              <Select
                native
                value={id}
                onChange={handleChange}
                input={<OutlinedInput label="Email" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {users.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.email}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
