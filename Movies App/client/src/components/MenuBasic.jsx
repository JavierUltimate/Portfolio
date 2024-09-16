import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MenuBasic({name}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const {logout}=useAuth()
  return (
    <div className='flex items-center'>
      <Button
      variant='outlined'
      sx={{
        textTransform:"capitalize",
        fontStyle:'bold',
      }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='w-[50vw]'
      >
        <MenuItem  onClick={handleClose}>
        <Link
                to="/login"
                className="w-[100%] transition hover:text-gray-500 flex justify-center items-center "
                onClick={logout}
              >

                Logout
              </Link></MenuItem>
             
      </Menu>
    </div>
  );
}