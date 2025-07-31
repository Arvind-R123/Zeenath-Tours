// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
//   const response = await axios.get('/api/categories');
//   return response.data;
// });

// export const fetchSubCategories = createAsyncThunk(
//   'categories/fetchSubCategories',
//   async (categoryId) => {
//     const response = await axios.get(`/api/categories/${categoryId}/subcategories`);
//     return response.data;
//   }
// );

// const categorySlice = createSlice({
//   name: 'categories',
//   initialState: {
//     categories: [],
//     subCategories: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch categories';
//       })
//       .addCase(fetchSubCategories.fulfilled, (state, action) => {
//         state.subCategories = action.payload;
//       });
//   },
// });

// export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL, api as baseApi } from "../../components/api/api"; // Ensure correct API base URL
import { store } from "..";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = BASE_API_URL;

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await baseApi.get(`/categories`);
      return response.data;
    } catch (error) {
      console.error(
        "Fetch categories Error:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || "Failed to fetch categories"
      );
    }
  }
);

// Fetch subcategories based on category ID

// Create a new category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (formdata, { getState, rejectWithValue }) => {
    const response = await baseApi.post(`/categories`, formdata);
    return response.data;
  }
);

// Update an existing category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await baseApi.put(`/categories/${data.id}`, data);
      //toast.success("Category updated successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update category"
      );
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    const response = await baseApi.delete(`/categories/${id}`);
    console.log(response.data, id);
    return { data: response.data, id };
  }
);

// Category slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    // subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })

      // Create category
      .addCase(createCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        //toast.success("Category updated successfully!");
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log(action);
        state.categories = state.categories.filter(
          (c) => c.id != action.payload.id
        );
      });
  },
});

export default categorySlice.reducer;
