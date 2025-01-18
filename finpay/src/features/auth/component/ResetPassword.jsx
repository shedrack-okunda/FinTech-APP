/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearResetPasswordError,
  clearResetPasswordSuccessMessage,
  resetPasswordAsync,
  resetResetPasswordStatus,
  SelectResetPasswordError,
  SelectResetPasswordStatus,
  SelectResetPasswordSuccessMessage,
} from "../AuthSlice";
import { useTheme } from "@emotion/react";
import {
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const status = useSelector(SelectResetPasswordStatus);
  const error = useSelector(SelectResetPasswordError);
  const successMessage = useSelector(SelectResetPasswordSuccessMessage);
  const { userId, passwordResetToken } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    return () => {
      dispatch(clearResetPasswordError());
    };
  }, [error]);

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success(successMessage?.message);
      navigate("/login");
    }

    return () => {
      dispatch(clearResetPasswordSuccessMessage());
    };
  }, [status]);

  useEffect(() => {
    return () => {
      dispatch(resetResetPasswordStatus());
    };
  }, []);

  const handleResetPassword = async (data) => {
    const cred = { ...data, userId: userId, token: passwordResetToken };
    delete cred.confirmPassword;
    dispatch(resetPasswordAsync(cred));
    reset();
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack component={Paper} elevation={2}>
        <Stack
          component={"form"}
          width={is500 ? "95vw" : "30rem"}
          p={"1rem"}
          rowGap={"1rem"}
          noValidate
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Stack rowGap={".3rem"} alignItems={"center"}>
            <Typography
              variant="h4"
              sx={{ color: theme.palette.secondary.main }}
              fontWeight={"600"}
            >
              Reset Password
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              Please enter and confirm new Password
            </Typography>
          </Stack>

          <Stack rowGap={".5rem"}>
            <MotionConfig whileHover={{ y: -2 }}>
              <motion.div>
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mt: 1 }}
                  {...register("password", {
                    required: "Please enter a password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters`,
                    },
                  })}
                  placeholder="Enter a New Password"
                />
                {errors.password && (
                  <FormHelperText error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </motion.div>

              <motion.div>
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mt: 1 }}
                  {...register("confirmPassword", {
                    required: "Please Confirm the password",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  placeholder="Confirm the New Password"
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ mt: 1 }} error>
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </motion.div>
            </MotionConfig>
          </Stack>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              sx={{
                height: "2.5rem",
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.2rem",
              }}
              fullWidth
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Reset Password
            </LoadingButton>
          </motion.div>
        </Stack>
      </Stack>
    </Stack>
  );
};
