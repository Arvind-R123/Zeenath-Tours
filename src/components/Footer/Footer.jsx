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
        bgcolor: "#222",
        color: "#f5f5f5",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              About Us
            </Typography>
            <Typography variant="body2" color="#bdbdbd">
              Zeenath Tours Travels is your trusted travel partner, offering
              safe and reliable transport across India. Book your journey today
              and travel with ease.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                size="small"
                placeholder="Enter your email"
                variant="outlined"
                sx={{ mr: 1, bgcolor: "#fff", borderRadius: 1 }}
              />
              <Button variant="contained" color="primary">
                Subscribe
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
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
                color="#bdbdbd"
                gutterBottom
                sx={{ display: "block" }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Business Hours
            </Typography>
            <Typography variant="body2" color="#bdbdbd" gutterBottom>
              Mon - Friday:
              <br />
              09.00 am to 07.00 pm
            </Typography>
            <Typography variant="body2" color="#bdbdbd" gutterBottom>
              Saturday:
              <br />
              10.00 am to 05.00 pm
            </Typography>
            <Typography variant="body2" color="#bdbdbd">
              Vacation:
              <br />
              All Sunday is our vacation
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Contact Info
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="#bdbdbd">
                Karaikudi, Tamil Nadu, India
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email color="primary" sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                component="a"
                href="mailto:info@zeenathtours.com"
                sx={{
                  textDecoration: "none",
                  color: "#bdbdbd",
                  "&:hover": { color: "#fff" },
                }}
              >
                info@zeenathtours.com
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone color="primary" sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                component="a"
                href="tel:+919159600457"
                sx={{
                  textDecoration: "none",
                  color: "#bdbdbd",
                  "&:hover": { color: "#fff" },
                }}
              >
                +91 91596 00457
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone color="primary" sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                component="a"
                href="tel:+919159600458"
                sx={{
                  textDecoration: "none",
                  color: "#bdbdbd",
                  "&:hover": { color: "#fff" },
                }}
              >
                +91 91596 00458
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <IconButton>
                <Facebook sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <Twitter sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <Instagram sx={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <LinkedIn sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#444" }} />
        <Typography variant="body2" color="#bdbdbd" align="center">
          © {new Date().getFullYear()} Zeenath Tours. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
