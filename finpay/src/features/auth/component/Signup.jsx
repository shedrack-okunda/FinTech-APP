/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormHelperText,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSignupError,
  resetSignupStatus,
  SelectLoggedInUser,
  SelectSignupError,
  SelectSignupStatus,
  signupAsync,
} from "../AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";
import { LoadingButton } from "@mui/lab";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(SelectSignupStatus);
  const error = useSelector(SelectSignupError);
  const loggedInUser = useSelector(SelectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const theme = useTheme();
  const navigate = useNavigate();

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  // handles signup error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Welcome! Verify your email.");
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  // this function handles signup and dispatches the signup action with credentials that api requires
  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
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
        elevation={3}
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
          Create a Secure Account
        </Typography>
        <Typography variant="body2" mb={3}>
          Welcome to the future of Savings & Investments
        </Typography>

        <Box
          spacing={2}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleSignup)}
        >
          <MotionConfig whileHover={{ y: -3 }}>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  First Name *
                </Typography>
                <motion.div>
                  <TextField
                    fullWidth
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <FormHelperText error>
                      {errors.firstName.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>

              <Grid2 item xs={12} sm={6}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  Last Name *
                </Typography>
                <motion.div>
                  <TextField
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <FormHelperText error>
                      {errors.lastName.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>

              <Grid2 item xs={12}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  Email Address *
                </Typography>
                <motion.div>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                        message: "Enter a valid email",
                      },
                    })}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <FormHelperText error>
                      {errors.email.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>

              <Grid2 item xs={12}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  Phone Number *
                </Typography>
                <motion.div>
                  <TextField
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                    })}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <FormHelperText error>
                      {errors.phoneNumber.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>

              <Grid2 item xs={12}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  Password *
                </Typography>
                <motion.div>
                  <TextField
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`,
                      },
                    })}
                    placeholder="Create a password"
                  />
                  <Typography variant="body2" sx={{ display: "flex" }}>
                    * Must be at least 8 characters
                  </Typography>
                  {errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>

              <Grid2 item xs={12}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  Re-enter Password *
                </Typography>
                <motion.div>
                  <TextField
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`,
                      },
                    })}
                    placeholder="Re-enter password"
                  />
                  {errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </motion.div>
              </Grid2>
            </Grid2>
          </MotionConfig>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              sx={{ height: "2.5rem" }}
              fullWidth
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Create Account
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
                  to={"/login"}
                  component={Link}
                >
                  Already a member?{" "}
                  <span style={{ color: theme.palette.primary.dark }}>
                    Login
                  </span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};
