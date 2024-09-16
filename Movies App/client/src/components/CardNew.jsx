import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import { Button } from "@mui/material";
import { Box, color } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CardNew({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const { deleteMovieContext } = useMovie();
  const { user } = useAuth();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{ maxWidth: 305, margin: 1, minHeight: "30vh", background: "white" }}
    >
      <CardHeader
        sx={{
          boxShadow: "0 0 10px rgba(0,0,0,.2)",
          background: "rgb(23,23,34)",
          margin: 1,
          color: "white",
          borderRadius: "5px",
        }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
      />
      <CardContent
        sx={{
          marginTop: "2%",
        }}
      >
        <Box>Created : {new Date(item.createdAt).toLocaleDateString()}</Box>

        <Typography variant="p" sx={{ color: "text.secondary" ,overflow:'hidden'}}>
          Title: {item.title}
        </Typography>
        <Box
          sx={{
            gap: 1,
            marginTop: "10%",
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,.2)",
          }}
        >
          <Link
            className="bg-[rgb(23,23,34)] text-yellow-500 p-2 rounded text-white text-center font-semibold"
            to={`/add-movie/${item._id}`}
          >
            Edit
          </Link>
          <Button
            variant={"contained"}
sx={{background:"rgb(230,139,0)"}}
            startIcon={<DeleteIcon />}
            onClick={() => deleteMovieContext(item._id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        in={expanded}
        sx={{
          zIndex: 1000,
        }}
        timeout="auto"
        unmountOnExit
      >
        <CardContent
          sx={{
            background: "rgb(23,23,34)",
            color: "white",
          }}
        >
          <Typography
            sx={{
              marginBottom: 2,
              fontWeight: "Bold",
              fontSize: "18px",
              border: 1,
              padding: 1,
              borderRadius: "5px",
            }}
            variant="h6"
          >
            Description:{" "}
            <Typography sx={{ marginBottom: 2 }}>{item.description}</Typography>
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>Author:{item.author}</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Company:{item.company}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
