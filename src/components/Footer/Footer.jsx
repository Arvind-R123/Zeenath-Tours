import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  IconButton,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #232526 0%, #000000 100%)",
        color: "#fff",
        pt: 8,
        pb: 4,
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            mb: 6,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 800, letterSpacing: "-1px" }}
              >
                Zeenath Tours
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", mb: 2 }}>
                Located in the heart of Karaikudi, Zeenath Tours has been a
                trusted name in the travel and transport industry for over 25
                years. We proudly serve customers traveling to any destination
                across South India and beyond.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": { color: "#222" },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#FF8906",
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    "&:hover": { bgcolor: "#7F5AF0" },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2 }}
              >
                Quick Links
              </Typography>
              {[
                "About",
                "Cars",
                "Car Types",
                "Team",
                "Contact us",
                "Terms & Conditions",
              ].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "#e0e0e0",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { color: "#FF8906" },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2 }}
              >
                Business Hours
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                <b>Mon - Friday:</b> 09.00 am to 07.00 pm
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                <b>Saturday:</b> 10.00 am to 05.00 pm
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                <b>Vacation:</b> All Sunday is our vacation
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2 }}
              >
                Contact Info
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <LocationOn sx={{ color: "#FF8906" }} />
                <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                  No: 11, T.T.Nagar 4th Street, Karaikudi-630001, Tamil Nadu,
                  India
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Email sx={{ color: "#FF8906" }} />
                <Typography
                  variant="body2"
                  component="a"
                  href="mailto:zeenathtours1@gmail.com"
                  sx={{
                    textDecoration: "none",
                    color: "#e0e0e0",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  zeenathtours1@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Phone sx={{ color: "#FF8906" }} />
                <Typography
                  variant="body2"
                  component="a"
                  href="tel:+919443495741"
                  sx={{
                    textDecoration: "none",
                    color: "#e0e0e0",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  +91 9443495741
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Phone sx={{ color: "#FF8906" }} />
                <Typography
                  variant="body2"
                  component="a"
                  href="tel:+919894487988"
                  sx={{
                    textDecoration: "none",
                    color: "#e0e0e0",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  +91 9894487988
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Instagram sx={{ color: "#FF8906" }} />
                <Typography
                  variant="body2"
                  component="a"
                  href="https://instagram.com/zeenath_tours"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#FF8906",
                      textDecoration: "underline",
                    },
                  }}
                >
                  @zeenath_tours
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} mt={2}>
                <IconButton
                  sx={{
                    bgcolor: "#fff",
                    color: "#3b5998",
                    "&:hover": { bgcolor: "#3b5998", color: "#fff" },
                  }}
                  href="#"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#fff",
                    color: "#1DA1F2",
                    "&:hover": { bgcolor: "#1DA1F2", color: "#fff" },
                  }}
                  href="#"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#fff",
                    color: "#E1306C",
                    "&:hover": { bgcolor: "#E1306C", color: "#fff" },
                  }}
                  href="https://instagram.com/zeenath_tours"
                  target="_blank"
                  rel="noopener"
                >
                  <Instagram />
                </IconButton>
                {/* <IconButton
                  sx={{
                    bgcolor: "#fff",
                    color: "#0077B5",
                    "&:hover": { bgcolor: "#0077B5", color: "#fff" },
                  }}
                  href="#"
                >
                  <LinkedIn />
                </IconButton> */}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.18)" }} />
        <Typography variant="body2" align="center" sx={{ color: "#e0e0e0" }}>
          © {new Date().getFullYear()} Zeenath Tours. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
