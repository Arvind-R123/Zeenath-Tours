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
import InfoIcon from "@mui/icons-material/Info";
import { Link, useLocation } from "react-router-dom";
import zeenathLogo from "../../assets/Zeenath_Tours_White.png";
import zeenathLogoBlack from "../../assets/Zeenath_Tours.png";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary"; // Add this import
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    {
      name: "About",
      path: "/about",
      icon: <InfoIcon fontSize="small" sx={{ verticalAlign: "middle" }} />,
    },
    // { name: "Services", path: "/services", icon: "🔧" },
    {
      name: "Gallery",
      path: "/gallery",
      icon: (
        <PhotoLibraryIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
      ),
    }, // Changed from Blog to Gallery
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
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        py: 3,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
          minHeight: "unset",
          px: 0,
        }}
      >
        {isMobile ? (
          <>
            {/* Mobile: logo left, menu right, pill background */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                px: { xs: 2, sm: 3 }, // Padding inside the navbar
                py: 1,
                borderRadius: "40px",
                background: "#232526",
                boxShadow: "0 8px 24px 0 rgba(0,0,0,0.18)",
                my: 1,
                mx: { xs: 1, sm: 2 }, // <-- Add margin on left and right for mobile
              }}
            >
              {/* Logo on the left */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={zeenathLogo}
                  alt="Zeenath Tours"
                  style={{
                    height: 32,
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>
              {/* Menu icon on the right */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15) rotate(15deg)";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#232526";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.10)";
                  e.currentTarget.style.transition =
                    "background 0.2s, color 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transition =
                    "background 0.2s, color 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1)";
                }}
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#fff",
                  transition:
                    "background 0.2s, color 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1)",
                  "&:hover": {
                    background: "#fff",
                    color: "#232526",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    transform: "scale(1.15) rotate(15deg)",
                  },
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "85vw",
                  bgcolor: "#f8f9fa",
                },
              }}
            >
              <Box
                sx={{
                  width: "85vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* Logo on the left inside drawer */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={zeenathLogoBlack}
                    alt="Zeenath Tours"
                    style={{
                      height: 36,
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
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
                      <Box
                        sx={{
                          mr: 2,
                          fontSize: "1.5rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item.icon}
                      </Box>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // Gradient and shadow for pill effect
              background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
              borderRadius: "40px",
              boxShadow: "0 8px 24px 0 rgba(0,0,0,0.18)",
              px: 3,
              py: 1,
              width: { xs: "85vw", md: "80vw", lg: "75vw" }, // Increased width
              maxWidth: 1400, // Increased maxWidth
              mx: "auto",
              minHeight: 64,
            }}
          >
            {/* Logo on the left */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
              component={Link}
              to="/"
            >
              <img
                src={zeenathLogo}
                alt="Zeenath Tours"
                style={{
                  height: 38,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
            {/* Nav Items and Book Now button on the right */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    mx: 1,
                    px: 2,
                    background: "transparent",
                    borderRadius: "20px",
                    transition: "background 0.2s, color 0.2s",
                    "&:hover": {
                      background: "#fff",
                      color: "#232526",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    },
                    ...(location.pathname === item.path && {
                      color: "#ffe600",
                      fontWeight: 700,
                    }),
                  }}
                  disableRipple
                >
                  {item.name}
                </Button>
              ))}
              <Box
                sx={{
                  ml: 2,
                  bgcolor: "#fff",
                  color: "#181818",
                  px: 2.5,
                  py: 0.7,
                  borderRadius: "40px",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#ffe600",
                    color: "#181818",
                  },
                }}
                onClick={handleBookNowClick}
              >
                Book Now
              </Box>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
