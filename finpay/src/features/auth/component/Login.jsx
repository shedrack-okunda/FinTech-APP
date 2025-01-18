/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";
import {
  Box,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginError,
  loginAsync,
  resetLoginStatus,
  SelectLoggedInUser,
  SelectLoginError,
  SelectLoginStatus,
} from "../AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { motion, MotionConfig } from "framer-motion";
import { LoadingButton } from "@mui/lab";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(SelectLoginStatus);
  const error = useSelector(SelectLoginError);
  const loggedInUser = useSelector(SelectLoggedInUser);
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  // handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === "fulfilled" && loggedInUser?.isVerified === true) {
      toast.success(`Login successful`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(loginAsync(cred));
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ overflow: "hidden" }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "2rem",
          textAlign: "center",
          maxWidth: "500px",
          width: "90%",
        }}
      >
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          fontWeight={"700"}
          mb={2}
        >
          FinPay
        </Typography>
        <Typography variant="h6" fontWeight={"600"} mb={1}>
          Login to your account
        </Typography>
        <Typography variant="body2" mb={3}>
          Securely login to your FinPay account
        </Typography>

        <Stack
          mt={4}
          spacing={2}
          width={is480 ? "95vw" : "28rem"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" sx={{ display: "flex" }}>
              Email Address or Phone Number *
            </Typography>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <FormHelperText sx={{ mt: 1 }} error>
                  {errors.email.message}
                </FormHelperText>
              )}
            </motion.div>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" sx={{ display: "flex" }}>
              Password *
            </Typography>
            <motion.div whileHover={{ y: -5 }}>
              <TextField
                type="password"
                fullWidth
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
              />
              {errors.password && (
                <FormHelperText sx={{ mt: 1 }} error>
                  {errors.password.message}
                </FormHelperText>
              )}
            </motion.div>
          </Box>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              fullWidth
              sx={{ height: "2.5rem" }}
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </motion.div>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap-reverse"}
          >
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <motion.div>
                <Typography
                  mr={"1.5rem"}
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={"/forgot-password"}
                  component={Link}
                >
                  Forgot password
                </Typography>
              </motion.div>

              <motion.div>
                <Typography
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={"/signup"}
                  component={Link}
                >
                  Don't have an account?{" "}
                  <span style={{ color: theme.palette.primary.dark }}>
                    Register
                  </span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
