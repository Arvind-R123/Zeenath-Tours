import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(register(formData));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(register(formData)).unwrap(); // Wait for registration to complete
      console.log("Registration successful:", result);
      navigate("/products"); // Redirect to products page
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-t-md"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-b-md"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => navigate("/login")} // Redirect to Login page
            >
              Already have an account? Login
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterForm;
