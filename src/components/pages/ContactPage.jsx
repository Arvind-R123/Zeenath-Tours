import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
  useTheme,
  Link,
  Paper,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const theme = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = form;
    const text = `*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    window.open(`https://wa.me/9790618699?text=${text}`, "_blank");
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Helmet>
        <title>Contact Us | Zeenath Tours</title>
        <meta
          name="description"
          content="Contact Zeenath Tours for premium car rental services in Karaikudi. Call, email, or send us a message for bookings and support."
        />
        <meta
          name="keywords"
          content="contact zeenath tours, car rental, karaikudi, phone, email, support"
        />
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: 320, md: 420 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(120deg, #7F5AF0 0%, #2CB67D 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1350&q=80')`,
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
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 7,
              px: { xs: 3, md: 8 },
              py: { xs: 6, md: 10 },
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              textAlign: "center",
              color: "#fff",
              maxWidth: 650,
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
                fontSize: { xs: "2.2rem", md: "3rem" },
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 1px 8px rgba(0,0,0,0.12)",
              }}
            >
              We'd love to hear from you. Get in touch today!
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CONTACT SECTION */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="stretch">
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 5,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 16px 0 rgba(127,90,240,0.10)",
                border: "1.5px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: "#7F5AF0",
                  letterSpacing: "-1px",
                  mb: 2,
                }}
              >
                Send Us a Message
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { my: 1.5 },
                  "& .MuiInputLabel-root": { fontWeight: 600 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
                onSubmit={handleWhatsAppSend}
              >
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variant="contained"
                  size="large"
                  type="submit"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: "#25D366",
                    color: "#fff",
                    borderRadius: "30px",
                    fontSize: "1.1rem",
                    boxShadow: "0 4px 24px 0 rgba(37,211,102,0.13)",
                    "&:hover": {
                      bgcolor: "#128C7E",
                    },
                  }}
                >
                  Send via WhatsApp
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 5,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 16px 0 rgba(127,90,240,0.10)",
                border: "1.5px solid #e0e0e0",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: "#7F5AF0",
                    letterSpacing: "-1px",
                    mb: 2,
                  }}
                >
                  Contact Information
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LocationOn color="primary" />
                    Our Location
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Zeenath Tours, Karaikudi, Tamil Nadu 630002, India
                  </Typography>
                  <Box
                    sx={{
                      height: "180px",
                      bgcolor: theme.palette.grey[300],
                      borderRadius: 2,
                      mt: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      title="Karaikudi Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.5247532024984!2d78.78476447590515!3d10.070010672106135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b006f487cc3b5e7%3A0xf7f48a9d0b21cd25!2sKaraikudi%2C%20Tamil%20Nadu%20630202!5e0!3m2!1sen!2sin!4v1690250605989!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Phone color="primary" />
                    Phone Numbers
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <Link
                      href="tel:+919790618699"
                      underline="hover"
                      color="inherit"
                    >
                      Main: +91 97906 18699
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <Link
                      href="tel:+919790618699"
                      underline="hover"
                      color="inherit"
                    >
                      Support: +91 97906 18699
                    </Link>
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Email color="primary" />
                    Email Addresses
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <Link
                      href="mailto:info@zeenathtours.com"
                      underline="hover"
                      color="inherit"
                    >
                      General: info@zeenathtours.com
                    </Link>
                  </Typography>
                  <Typography variant="body1">
                    <Link
                      href="mailto:support@zeenathtours.com"
                      underline="hover"
                      color="inherit"
                    >
                      Support: support@zeenathtours.com
                    </Link>
                  </Typography>
                </Box>
              </Box>

              {/* Social Icons */}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <IconButton
                  sx={{
                    bgcolor: "#3b5998",
                    color: "white",
                    "&:hover": { bgcolor: "#2d4373" },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#1DA1F2",
                    color: "white",
                    "&:hover": { bgcolor: "#0d8ddc" },
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#E1306C",
                    color: "white",
                    "&:hover": { bgcolor: "#b91d53" },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    bgcolor: "#0077B5",
                    color: "white",
                    "&:hover": { bgcolor: "#005582" },
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
