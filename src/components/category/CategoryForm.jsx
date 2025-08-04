import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  updateCategory,
} from "../../store/slices/categorySlice";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    category_name: "",
    description: "",
    size: "",
    stock: "",
    category: "",
    sub_category: "",
    imageUrl: "",
    status: "",
    unit: "",
    variant: "",
  });

  useEffect(() => {
    // dispatch(fetchCategories());
    if (id) {
      const category = categories.find((c) => c.id === Number(id));
      if (category) {
        setFormData(category);
        // dispatch(fetchSubCategories(category.categoryId));
      }
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateCategory(formData));
        toast.success("Category updated successfully!");
      } else {
        await dispatch(createCategory(formData));
        toast.success("Category created successfully!");
      }
      setTimeout(() => {
        navigate("/category");
      }, 500);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = Number(e.target.value);
    // setFormData({ ...formData, categoryId, subCategoryId: "" });
    // dispatch(fetchSubCategories(categoryId));
  };

  return (
    <>
      <Box
        sx={{
          margin: 3,
          bgcolor: "white",
          borderRadius: 2,
          padding: 3,
          height: "100%",
        }}
      >
        <Typography variant="h5" sx={{ m: 3, fontWeight: "bold" }}>
          {id ? "Edit Category" : "Create Category"}
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid
            container
            spacing={6}
            sx={{
              margin: 3,
              borderRadius: 2,
            }}
          >
            {/* Category Name */}
            <Grid item xs={6}>
              <Box>
                <Typography fontWeight="bold" color="black" sx={{ mb: 1 }}>
                  Category Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Category Name"
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  autoComplete="off"
                  // required
                  sx={{
                    "& .MuiInputBase-root": { height: "40px", width: "400px" },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography fontWeight="bold" color="black">
                  Description
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  autoComplete="off"
                  // required
                  sx={{
                    "& .MuiInputBase-root": { height: "40px", width: "400px" },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography fontWeight="bold" color="black">
                  Status
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  sx={{
                    width: "300px",
                    "& .MuiInputBase-root": { height: "40px", width: "400px" },
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Box>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box
            sx={{ mt: 7, display: "flex", gap: 4, justifyContent: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ borderRadius: "18px" }}
            >
              {id ? "Update" : "Create"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/category")}
              sx={{ borderRadius: "18px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() =>
                setFormData({
                  name: "",
                  category_name: "",
                  description: "",
                  size: "",
                  stock: "",
                  categoryId: "",
                  subCategoryId: "",
                  imageUrl: "",
                  status: "",
                })
              }
              sx={{ borderRadius: "18px" }}
            >
              Clear
            </Button>
          </Box>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </Box>
    </>
  );
};

export default CategoryForm;
