import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { login, signup } from "../../apis/api";
import { toast } from "react-toastify"; // Import toast

// Styled components
const Root = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: "100%",
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AuthPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.includes("@")) errors.email = "Invalid email address";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!isLogin && !formData.name) errors.name = "Name is required for signup";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await login(formData);
        localStorage.setItem("token", response.token); // Store token in localStorage
        localStorage.setItem("role", response.role); // Store role in localStorage
        toast.success("Login successful!"); // Show success toast on login
        navigate("/"); // Redirect to HomePage on successful login
      } else {
        await signup(formData);
        toast.success("User registered successfully!"); // Show success toast on signup
        setIsLogin(true); // Switch to login after successful signup
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed. Please try again."); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Root>
      <StyledPaper>
        <Typography variant="h4">{isLogin ? "Login" : "Signup"}</Typography>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </StyledButton>
        </form>
        <StyledButton
          onClick={() => setIsLogin(!isLogin)}
          aria-label={isLogin ? "Switch to Signup" : "Switch to Login"}
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </StyledButton>
      </StyledPaper>
    </Root>
  );
};

export default AuthPage;
