import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const Blog = ({ title, description, imageUrl, userName,isUser,id }) => {
  const navigate = useNavigate();
const handleEdit = (e) => {
navigate(`/myBlogs/${id}`);
};
const deleteRequest = async ()=>{
  const res = await axios.delete(`http://localhost:5000/api/blog/${id}`) .catch(err=>console.log(err));
  const data = await res.data;
  return data;
}

const handleDelete = (e)=>{

deleteRequest().then(()=>navigate("/")).then(navigate("/blogs"));
};
  console.log(isUser);
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
       { isUser &&(<Box display="flex" >
          <IconButton color="warning" onClick={handleEdit} sx={{ml:"auto"}}>
<EditIcon/>
          </IconButton >
          <IconButton color="error" onClick={handleDelete} >
<DeleteForeverIcon/>
          </IconButton>
           
        </Box>)}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="auto"
          width={"auto"}
          image={imageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <hr></hr>
          <br/>
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b>
            {":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
