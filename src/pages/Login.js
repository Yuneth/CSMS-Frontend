import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../services/authService";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await loginUser(values);
        console.warn(response);
        const user = {
          id: response?.id,
          userName: response?.username,
        };
        localStorage.setItem("token", response?.userToken);
        localStorage.setItem("userData", JSON.stringify(user));
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Invalid username or password");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundImage:
          'url("https://source.unsplash.com/1600x900/?car,garage")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Welcome Back
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 1, py: 1.5, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
          >
            Register here
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
