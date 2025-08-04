import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import van from "../../assets/van.avif";
import van2 from "../../assets/van2.webp";
import van3 from "../../assets/van3.jpg";
import van4 from "../../assets/van4.avif";
import van5 from "../../assets/van5.avif";
import van6 from "../../assets/van6.avif";
import van7 from "../../assets/van7.jpg";
import van8 from "../../assets/van8.jpg";
import van9 from "../../assets/van9.jpg";
import bus from "../../assets/bus.avif";

const GalleryPage = () => {
  const theme = useTheme();

  const galleryItems = [
    {
      title: "Premium Luxury Van",
      description: "Our flagship vehicle with all modern amenities",
      image: van,
    },
    {
      title: "Executive Travel Van",
      description: "Comfortable seating for business travelers",
      image: van2,
    },
    {
      title: "Family Adventure Van",
      description: "Spacious interior for family trips",
      image: van3,
    },
    {
      title: "City Explorer Van",
      description: "Compact design for urban tours",
      image: van4,
    },
    {
      title: "Mountain Terrain Van",
      description: "4WD capability for hill station tours",
      image: van5,
    },
    {
      title: "Coastal Cruiser Van",
      description: "Perfect for beachside getaways",
      image: van6,
    },
    {
      title: "Temple Tour Van",
      description: "Traditional design for pilgrimage trips",
      image: van7,
    },
    {
      title: "VIP Charter Van",
      description: "Luxury interior for special occasions",
      image: van8,
    },
    {
      title: "Eco-Friendly Van",
      description: "Hybrid engine for sustainable travel",
      image: van9,
    },
    {
      title: "Tourist Coach Bus",
      description: "Large capacity for group tours",
      image: bus,
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <Helmet>
        <title>Gallery | Zeenath Tours</title>
        <meta
          name="description"
          content="Explore the Zeenath Tours gallery. View our premium fleet of vehicles and see why we are the best choice for car rentals in Karaikudi."
        />
        <meta
          name="keywords"
          content="gallery, zeenath tours, car rental, fleet, vehicles, karaikudi"
        />
      </Helmet>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${van3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 10, md: 16 },
          minHeight: { xs: 320, md: 420 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              borderRadius: 6,
              px: { xs: 3, md: 8 },
              py: { xs: 5, md: 7 },
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
              textAlign: "center",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-2px",
                mb: 2,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                textShadow: "0 2px 24px rgba(0,0,0,0.18)",
              }}
            >
              Our Fleet Gallery
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 1px 8px rgba(0,0,0,0.12)",
                fontWeight: 500,
              }}
            >
              Explore our premium vehicles designed for your comfort and safety
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.main,
            mb: 6,
            letterSpacing: "-1px",
          }}
        >
          Vehicle Collection
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {galleryItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                component={motion.div}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px rgba(127,90,240,0.13)",
                  y: -8,
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 5,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px 0 rgba(127,90,240,0.08)",
                  border: "1.5px solid #e0e0e0",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(4px)",
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                  position: "relative",
                }}
                elevation={0}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: 240,
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.00) 60%, rgba(0,0,0,0.32) 100%)",
                      zIndex: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                      "&:hover": {
                        transform: "scale(1.06)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: "1rem",
                      zIndex: 2,
                      boxShadow: 2,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.title}
                  </Box>
                </Box>
                <CardContent
                  sx={{
                    textAlign: "center",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: "#444",
                      mb: 1,
                      fontSize: "1.08rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GalleryPage;
