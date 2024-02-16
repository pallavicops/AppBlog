import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = React.useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => {
        console.log(err);
      });
    const data = res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
       
      
      })
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      
    }).catch((error) => console.log(error));
    const data = await res.data;
    console.log(data);
    return data;

  }

  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(navigate("/blogs"));
  };
  return (
    <div>{inputs &&
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(8,62,240,1) 0%, rgba(18,5,83,1) 75%, rgba(11,141,226,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={10}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color={
              "linear-gradient(90deg, rgba(8,62,240,1) 0%, rgba(18,5,83,1) 75%, rgba(11,141,226,1) 100%)"
            }
            variant="h2"
            margin={"auto"}
          >
            Post Your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {/* <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <TextField
            name="imageUrl"
            value={inputs.imageUrl}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          /> */}
          <Button
            type="submit"
            sx={{ mt: 2, borderRadius: 4 }}
            color="warning"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>}
    </div>
  );
};

export default BlogDetails;
