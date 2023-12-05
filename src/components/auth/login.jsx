import { Container, Typography, Box, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "./input";
import { theme } from "../theme";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/user.slice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const handleSignIn = useCallback(
    (e) => {
      e.preventDefault();
      let data = {
        name,
        email,
      };
      dispatch(addUser(data));
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/");
    },
    [name, email, dispatch, navigate]
  );

  return (
    <Box>
      <Container maxWidth="lg">
        <form onSubmit={handleSignIn}>
          <Typography
            fontFamily="Poppins sans-serif"
            align="center"
            variant="h3"
            mt={6}
          >
            Register
          </Typography>
          <Typography mt={2}>Name</Typography>
          <CustomInput
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            type="text"
          />
          <Typography mt={2}>Email</Typography>
          <CustomInput
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            type="email"
          />

          <Button
            type="submit"
            fontFamily="Poppins sans-serif"
            sx={{
              color: theme.palette.primary.main,
              border: `2px solid ${theme.palette.primary.main}`,
              width: "100%",
              py: 2,
              mt: 3,
              fontWeight: 800,
            }}
          >
            Enter Email
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;
