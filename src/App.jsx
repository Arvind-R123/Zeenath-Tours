// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
// import LoginForm from "./components/auth/LoginForm";
// import RegisterForm from "./components/auth/RegisterForm";

// import CategoryList from "./components/category/CategoryList";
// import CategoryForm from "./components/category/CategoryForm";
// import CategoryDetail from "./components/category/CategoryDetail";

// import Dashboard from "./components/dashboard/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
// import Layout from "./components/Layout";

// function App() {
//   const theme = createTheme({
//     spacing: 4,
//     palette: {
//       mode: "light",
//       primary: {
//         main: "#573BFE",
//       },
//       text: {
//         primary: "#202635",
//         secondary: "#A0AEC0",
//       },
//       secondary: {
//         main: "#01C0F6",
//       },
//       error: {
//         main: "#E03137",
//       },
//     },
//     typography: {
//       fontFamily: "Inter",
//     },
//     components: {
//       MuiCssBaseline: {
//         styleOverrides: `
//           @font-face {
//             font-family: 'Inter';
//             font-style: normal;
//             font-display: swap;
//             font-weight: 400;
//             unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
//           }
//         `,
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <Provider store={store}>
//         <CssBaseline />
//         <Router>
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<RegisterForm />} />
//             <Route
//               path="/"
//               element={
//                 <PrivateRoute>
//                   <Layout />
//                 </PrivateRoute>
//               }
//             >
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="category" element={<CategoryList />} />
//               <Route path="category/new" element={<CategoryForm />} />
//               <Route path="category/:id" element={<CategoryDetail />} />
//               <Route path="category/edit/:id" element={<CategoryForm />} />
//             </Route>
//           </Routes>
//         </Router>
//       </Provider>
//     </ThemeProvider>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import BlogPage from "./components/pages/BlogPage";
import ContactPage from "./components/pages/ContactPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#573BFE",
    },
    secondary: {
      main: "#01C0F6",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
