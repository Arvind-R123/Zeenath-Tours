import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import {
  EmojiEvents,
  DirectionsCar,
  SupportAgent,
  LocationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Step 1: Import useNavigate

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // ✅ Step 2: Initialize navigate

  const features = [
    {
      icon: <DirectionsCar fontSize="large" />,
      title: "Comfortable Rides",
      description:
        "Spacious and clean vehicles for a smooth journey every time.",
      color: "#573BFE",
    },
    {
      icon: <SupportAgent fontSize="large" />,
      title: "24/7 Support",
      description: "Support available around the clock for bookings or help",
      color: "#01C0F6",
    },
    {
      icon: <EmojiEvents fontSize="large" />,
      title: "Trusted Service",
      description:
        "Over a decade of experience with excellent customer satisfaction.",
      color: "#FF9800",
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: "Wide Coverage",
      description:
        "Serving major cities, tourist spots, and airports across India.",
      color: "#4CAF50",
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 12,
          textAlign: "center",
          color: "white",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 800 }}
          >
            Our Story
          </Typography>
          <Typography variant="h5">
            Redefining travel experiences since 2010
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
            >
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
              Zeenath Tours, established in 2010, has grown from a local travel
              provider into a trusted name in India’s tourism and transport
              sector. We offer safe, comfortable, and affordable travel services
              for solo travelers, families, and business trips across the
              country.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
              With a fleet of well-maintained vehicles, experienced drivers, and
              reliable customer support, we ensure smooth and enjoyable
              journeys. Our goal is to make every trip stress-free, memorable,
              and filled with value—so your travel experience is always the best
              with Zeenath Tours.
            </Typography>

            {/* ✅ Step 3: Button navigates to homepage */}
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Explore Our Fleet
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: 6,
                height: "400px",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.grey[100] }}>
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            Why Choose Zeenath Tours
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  component={motion.div}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  sx={{
                    height: "100%",
                    border: `2px solid ${feature.color}`,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "transparent",
                      background: `linear-gradient(white, white) padding-box, linear-gradient(45deg, ${feature.color}, ${theme.palette.primary.main}) border-box`,
                      border: "2px solid transparent",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: feature.color,
                        color: "white",
                        width: 70,
                        height: 70,
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
