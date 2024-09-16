import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import MovieFormPage from "../pages/MovieFormPage";
import HomeIcon from "@mui/icons-material/Home";
import { Alert } from "@mui/material";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

export default function DrawerBasic() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          marginTop: 8,
          justifyItems: "start",
        }}
      >
        <div className="bg-gray-500 w-[100%] h-8"></div>
        <li className=" text-center w-[100%]  h-10 flex justify-center items-center transition hover:bg-gray-100">
          <Link
            className="transition hover:text-gray-500"
            to="/add-movie"
            element={<MovieFormPage />}
          >
            Add Movie
          </Link>
        </li>

        <li className=" text-center w-[100%]  h-10 flex justify-center items-center transition hover:bg-gray-100">
          <Link to="/movie" className="transition hover:text-gray-500">
            Movies
          </Link>
        </li>
        <li className=" text-center w-[100%]  h-10 flex justify-center items-center transition hover:bg-gray-100">
          <Link
            to="/dashboard"
            className="transition hover:text-gray-500 flex items-center  gap-1"
          >
            Admin
            <LockPersonIcon />
          </Link>
        </li>
        <li className="flex items-center  gap-2  text-center w-[100%]  h-10 f justify-center transition hover:bg-gray-100">
          <Link
            to="/"
            className="transition hover:text-gray-500 flex items-center  gap-1"
          >
            Home
            <HomeIcon />
          </Link>
        </li>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><DensityMediumIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
