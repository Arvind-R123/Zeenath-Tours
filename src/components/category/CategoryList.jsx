import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  fetchCategories,
} from "../../store/slices/categorySlice"; // Updated for categories
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Loader from "../ultizes/Loader";

const CategoryList = ({ categoriesView, setCategoriesView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { categories, loading } = useSelector((state) => state.categories);
  // console.log(categories, "payload");
  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on mount
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await dispatch(deleteCategory(id));
        toast.success("Category Deleted successfully!");
        // setCategoriesView((prev) => ({ ...prev, list: true })); // Refresh list view
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const filteredRows = categories?.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns1 = [
    {
      field: "id", // Custom field for the index
      headerName: "ID",
      width: 180,
      renderHeader: () => (
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          ID
        </Typography>
      ),
      renderCell: (params) => (
        <>{params.api.getAllRowIds().indexOf(params.id) + 1}</>
      ),
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 250,
      renderHeader: () => (
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          Category Name
        </Typography>
      ),
    },

    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderHeader: () => (
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          Description
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderHeader: () => (
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.row.status === "active" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.row.status &&
            params.row.status.charAt(0).toUpperCase() +
              params.row.status.slice(1).toLowerCase()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderHeader: () => (
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
        >
          Actions
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          <IconButton
            sx={{ color: "blue" }}
            onClick={() => navigate(`/category/edit/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "red" }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Loader />
      </Box>
    );

  return (
    <Grid item md={12}>
      <Box
        sx={{
          margin: 3,
          bgcolor: "white",
          borderRadius: 2,
          padding: 3,
          height: "100%",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Category List
            </Typography>
            <Link
              to="/category/new"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Category
            </Link>
          </div>
          <Box>
            {/* {JSON.stringify(categories)} */}
            <TextField
              label="🔍 Search"
              variant="outlined"
              sx={{
                mb: 2,
                bgcolor: "background.default",
                input: { color: "text.primary" },
                borderRadius: 2,
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <DataGrid
              rows={filteredRows} // Ensure this is populated
              columns={columns1}
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              // autoPageSize
              getRowId={(row) => row.id}
            />
          </Box>
        </div>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Grid>
  );
};

export default CategoryList;
