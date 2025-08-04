import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import Gallery from "./components/pages/Gallery";
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
  const msg = "Hello, World!";

  return (
    <>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </HelmetProvider>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919443495741"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width="36"
          height="36"
        />
      </a>

      <style>{`
        .whatsapp-float {
          position: fixed;
          left: 20px;
          bottom: 20px;
          z-index: 9999;
          background: #25d366;
          border-radius: 50%;
          padding: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          transition: box-shadow 0.2s;
        }
        .whatsapp-float:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .whatsapp-float img {
          display: block;
        }
      `}</style>
    </>
  );
}

export default App;
