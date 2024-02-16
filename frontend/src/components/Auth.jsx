import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = React.useState(false);
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => console.log(error));
    const data = res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          maxWidth={400}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={5}
          boxShadow="10px 10px 20px #ccc"
          padding={5}
          margin="auto"
          marginTop={10}
        >
          <Typography padding={5} variant="h2" color="#120553">
            {isSignUp ? "SignUp" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField
              name="name"
              value={inputs.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              margin="normal"
            />
          )}
          {""}

          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            margin="normal"
          />

          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
