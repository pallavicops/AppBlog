import { InputLabel, Typography, TextField, Box, Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = React.useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image:   inputs.imageUrl,
        user: localStorage.getItem("userId"),
      })
      .catch((error) => console.log(error));
    const data = res.data;
    
    return data;
  };
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(navigate("/blogs"));
  };
  return (
    <div>
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
          <TextField name="title" value={inputs.title} onChange={handleChange}
          margin="normal" variant="outlined" />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined" />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <TextField name="imageUrl" value={inputs.imageUrl} onChange={handleChange} margin="normal" variant="outlined" />
        <Button type="submit"sx={{mt:2, borderRadius:4}} color="warning" variant="contained">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
