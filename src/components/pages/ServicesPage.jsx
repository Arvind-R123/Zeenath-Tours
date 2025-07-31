import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Avatar,
  Divider,
} from "@mui/material";
import {
  AirportShuttle,
  DirectionsCar,
  TimeToLeave,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ServicesPage = () => {
  const theme = useTheme();

  const services = [
    {
      icon: <DirectionsCar fontSize="large" />,
      title: "City Ride",
      description:
        "Comfortable rides for daily travel and short-distance trips.",
      price: "₹999 / day",
      features: ["AC/Non-AC options", "Professional drivers", "Fuel included"],
      color: "#573BFE",
    },
    {
      icon: <AirportShuttle fontSize="large" />,
      title: "Airport Transfers",
      description: "On-time pick-up & drop at major airports across India.",
      price: "₹1299 / trip",
      features: ["Flight tracking", "Meet & Greet", "24x7 availability"],
      color: "#01C0F6",
    },
    {
      icon: <TimeToLeave fontSize="large" />,
      title: "Luxury Tour",
      description:
        "Travel in style for weddings, VIP events, or weekend getaways.",
      price: "₹2999 / day",
      features: [
        "Luxury vehicles",
        "Chauffeur-driven",
        "Custom itinerary support",
      ],
      color: "#FF9800",
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
            Our Services
          </Typography>
          <Typography variant="h5">
            Flexible transport options for every occasion
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 6 }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                sx={{
                  height: "100%",
                  border: `3px solid ${service.color}`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 10px 20px ${service.color}40`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: service.color,
                      color: "white",
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    {service.icon}
                  </Avatar>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700, color: service.color }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {service.description}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: service.color }}
                    >
                      {service.price}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ flexGrow: 1, textAlign: "left", mb: 3 }}>
                    {service.features.map((feature, i) => (
                      <Typography
                        key={i}
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: service.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: service.color,
                      fontWeight: 700,
                      "&:hover": {
                        bgcolor: `${service.color}CC`,
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesPage;
