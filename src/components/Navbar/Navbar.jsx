import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Services", path: "/services", icon: "🔧" },
    { name: "Blog", path: "/blog", icon: "📰" },
    { name: "Contact", path: "/contact", icon: "📞" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Custom styled button for the navbar
  const NavButton = styled(Button)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "capitalize",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "transparent",
    },
    "&.active": {
      color: "#ff0000", // Red color for active link
    },
  }));

  const handleBookNowClick = () => {
    // If not on home page, navigate to home and scroll after navigation
    if (location.pathname !== "/") {
      window.location.href = "/#booking-form";
    } else {
      const form = document.getElementById("booking-form");
      if (form) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Top info bar - hidden on mobile */}
      {!isMobile && (
        <Box
          sx={{
            bgcolor: "#573BFE", // Purple color
            color: "white",
            py: 1,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" sx={{ color: "#01C0F6" }} />{" "}
                {/* Teal color */}
                <Typography variant="body2" fontWeight="bold">
                  +01234567890
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" sx={{ color: "#01C0F6" }} />
                <Typography variant="body2" fontWeight="bold">
                  Example@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ color: "#01C0F6" }} />
                <Typography variant="body2" fontWeight="bold">
                  Karaikudi
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Main navigation */}
      <Toolbar
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          justifyContent: "space-between",
          py: isMobile ? 1 : 2,
          px: isMobile ? 2 : 0,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #573BFE 30%, #01C0F6 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: isMobile ? "1.8rem" : "2.5rem",
          }}
        >
          Zeenath Tours
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: "#573BFE" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "85vw", // Wider drawer on mobile
                  bgcolor: "#f8f9fa",
                },
              }}
            >
              <Box
                sx={{ width: "85vw" }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.path}
                      sx={{
                        py: 2,
                        "&.active": {
                          bgcolor: "#e9ecef",
                          "& .MuiListItemText-primary": {
                            color: "#ff0000",
                            fontWeight: "bold",
                          },
                        },
                      }}
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
                    >
                      <Box sx={{ mr: 2, fontSize: "1.5rem" }}>{item.icon}</Box>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                        }}
                      />
                    </ListItem>
                  ))}
                  <ListItem sx={{ px: 2, py: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        py: 1.5,
                        bgcolor: "#573BFE",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        "&:hover": {
                          bgcolor: "#3a26b5",
                        },
                      }}
                      onClick={handleBookNowClick}
                    >
                      Book Now
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map((item) => (
              <NavButton
                key={item.name}
                component={Link}
                to={item.path}
                startIcon={
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                }
                className={location.pathname === item.path ? "active" : ""}
                sx={{
                  "&.active": {
                    color: "#ff0000",
                  },
                }}
              >
                {item.name}
              </NavButton>
            ))}
            <Button
              variant="contained"
              sx={{
                bgcolor: "#573BFE",
                fontWeight: "bold",
                px: 3,
                py: 1,
                "&:hover": {
                  bgcolor: "#3a26b5",
                },
              }}
              onClick={handleBookNowClick}
            >
              Book Now
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
