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
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import {
  EmojiEvents,
  DirectionsCar,
  SupportAgent,
  LocationOn,
  Star,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const features = [
  {
    icon: <DirectionsCar fontSize="large" />,
    title: "Comfortable Rides",
    description:
      "Spacious, clean, and modern vehicles for a smooth journey every time.",
    color: "#7F5AF0",
  },
  {
    icon: <SupportAgent fontSize="large" />,
    title: "24/7 Support",
    description: "Always-on assistance for bookings and travel emergencies.",
    color: "#2CB67D",
  },
  {
    icon: <EmojiEvents fontSize="large" />,
    title: "Trusted Service",
    description: "15+ years of excellence and thousands of happy travelers.",
    color: "#FF8906",
  },
  {
    icon: <LocationOn fontSize="large" />,
    title: "Wide Coverage",
    description:
      "Serving major cities, tourist spots, and airports across India.",
    color: "#F25F4C",
  },
];

const testimonials = [
  {
    name: "Priya S.",
    text: "Zeenath Tours made our family trip so easy and memorable. The car was spotless and the driver was very professional.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Rahul K.",
    text: "Excellent service and support! Booking was seamless and the ride was super comfortable.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Ayesha M.",
    text: "Highly recommend Zeenath Tours for business travel. Always on time and reliable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
];

const timeline = [
  {
    year: "2000",
    title: "Founded",
    desc: "Started as a small local travel provider in Karaikudi.",
  },
  {
    year: "2010",
    title: "Fleet Expansion",
    desc: "Expanded our fleet to serve more cities and customers.",
  },
  {
    year: "2018",
    title: "National Reach",
    desc: "Began serving major airports and tourist destinations across India.",
  },
  {
    year: "2025",
    title: "8,000+ Happy Customers",
    desc: "Celebrated a milestone of 8,000+ satisfied travelers.",
  },
];

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Helmet>
        <title>About Us | Zeenath Tours</title>
        <meta
          name="description"
          content="Learn about Zeenath Tours, our story, values, and why we are a trusted name in car rental and travel services in India."
        />
        <meta
          name="keywords"
          content="about zeenath tours, car rental, travel, karaikudi, india, company profile"
        />
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: 420, md: 540 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(120deg, #7F5AF0 0%, #2CB67D 100%), url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1350&q=80')`,
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.10)",
              borderRadius: 8,
              px: { xs: 3, md: 10 },
              py: { xs: 7, md: 12 },
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              textAlign: "center",
              color: "#fff",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                letterSpacing: "-2px",
                textShadow: "0 2px 24px rgba(0,0,0,0.18)",
                mb: 2,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
              }}
            >
              About Zeenath Tours
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 500,
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 1px 8px rgba(0,0,0,0.12)",
              }}
            >
              Redefining travel experiences since 2010
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.7,
                borderRadius: "40px",
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "linear-gradient(90deg, #FF8906 0%, #7F5AF0 100%)",
                color: "#fff",
                boxShadow: "0 4px 24px 0 rgba(127,90,240,0.18)",
                textTransform: "none",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #7F5AF0 0%, #FF8906 100%)",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/")}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* TIMELINE / STORY */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            color: "#7F5AF0",
            letterSpacing: "-1px",
            mb: 6,
          }}
        >
          Our Journey
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {timeline.map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={item.year}>
              <Paper
                elevation={0}
                component={motion.div}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ duration: 0.3 }}
                sx={{
                  p: 3,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 2px 16px 0 rgba(127,90,240,0.08)",
                  border: "1.5px solid #e0e0e0",
                  textAlign: "center",
                  minHeight: 180,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#2CB67D",
                    mb: 1,
                    fontSize: "2.2rem",
                  }}
                >
                  {item.year}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#7F5AF0", mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* WHO WE ARE */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#7F5AF0",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                Who We Are
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.15rem", color: "text.secondary" }}
              >
                Zeenath Tours, established in 2000, has grown from a local
                travel provider into a trusted name in India’s tourism and
                transport sector. We offer safe, comfortable, and affordable
                travel services for solo travelers, families, and business trips
                across the country.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.15rem", color: "text.secondary" }}
              >
                With a fleet of well-maintained vehicles, experienced drivers,
                and reliable customer support, we ensure smooth and enjoyable
                journeys. Our goal is to make every trip stress-free, memorable,
                and filled with value—so your travel experience is always the
                best with Zeenath Tours.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              sx={{
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: 8,
                height: { xs: 260, md: 400 },
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* FEATURES */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          background: "linear-gradient(120deg, #F5F7FA 0%, #C3CFE2 100%)",
        }}
      >
        <Container>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "#7F5AF0",
              letterSpacing: "-1px",
              mb: 6,
            }}
          >
            Why Choose Zeenath Tours
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  component={motion.div}
                  whileHover={{
                    y: -8,
                    scale: 1.04,
                    boxShadow: "0 12px 32px rgba(127,90,240,0.13)",
                  }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 2px 16px 0 rgba(127,90,240,0.08)",
                    border: "1.5px solid #e0e0e0",
                    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                  }}
                  elevation={0}
                >
                  <CardContent sx={{ textAlign: "center", p: 4 }}>
                    <Avatar
                      sx={{
                        bgcolor: feature.color,
                        color: "#fff",
                        width: 72,
                        height: 72,
                        mx: "auto",
                        mb: 3,
                        boxShadow: "0 4px 16px 0 rgba(127,90,240,0.13)",
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 700, color: "#181818" }}
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

      {/* TESTIMONIALS */}
      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            color: "#7F5AF0",
            letterSpacing: "-1px",
            mb: 6,
          }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                elevation={0}
                component={motion.div}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ duration: 0.3 }}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 2px 16px 0 rgba(127,90,240,0.10)",
                  border: "1.5px solid #e0e0e0",
                  textAlign: "center",
                  minHeight: 220,
                }}
              >
                <Avatar
                  src={t.avatar}
                  alt={t.name}
                  sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 2px 8px 0 rgba(127,90,240,0.10)",
                  }}
                />
                <Typography variant="body1" sx={{ mb: 2, color: "#444" }}>
                  "{t.text}"
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.5}
                  justifyContent="center"
                  mb={1}
                >
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: "#FF8906", fontSize: 22 }} />
                  ))}
                </Stack>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#7F5AF0", fontWeight: 700 }}
                >
                  {t.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
