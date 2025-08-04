import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  useMediaQuery,
  useTheme,
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  styled,
  Paper,
  IconButton,
} from "@mui/material";
import {
  DirectionsCar,
  SupportAgent,
  LocalOffer,
  AirportShuttle,
  Favorite,
  LocationCity,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  ArrowForward,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Collections,
} from "@mui/icons-material";
import Phone from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView, animate } from "framer-motion";
import { useCallback } from "react";
import { Room, People, Star, CheckCircleOutline } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";

// Import all images from assets
import heroBg from "../../assets/car1.jpg";
import ctaBg from "../../assets/car1.jpg";
import aboutImage from "../../assets/car9.JPG";
import testimonial from "../../assets/testimonials.jpg";
import van from "../../assets/van.avif";
import vanss from "../../assets/vanss.png";
import van2 from "../../assets/van2.webp";
import van3 from "../../assets/van3.jpg";
import van4 from "../../assets/van4.avif";
import van5 from "../../assets/van5.avif";
import van6 from "../../assets/van6.avif";
import van7 from "../../assets/van7.jpg";
import van8 from "../../assets/van8.jpg";
import van9 from "../../assets/van9.jpg";
import bus from "../../assets/bus.avif";
import map from "../../assets/map.jpeg";
import force from "../../assets/Force.png";
import Innova from "../../assets/innova.png";
import shift from "../../assets/shift_Dzire.png";
import Urbania from "../../assets/urbania.png";

// Image object with all imported images
const images = {
  heroBg,
  ctaBg,
  aboutImage,
  cars: [van, van2, van3, van4, bus, van6, van7, van8, van9],
};

// Custom styled components
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
  color: "white",
}));

const AnimatedCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s, box-shadow 0.3s",
  borderRadius: theme.shape.borderRadius * 2,
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[8],
    "&::before, &::after": {
      opacity: 1,
    },
  },
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.grey[700],
    opacity: 0,
    transition: "all 0.3s ease",
    zIndex: 1,
  },
  "&::before": {
    top: 0,
    left: 0,
    borderTopLeftRadius: theme.shape.borderRadius * 2,
    transform: "translate(-50%, -50%)",
  },
  "&::after": {
    top: 0,
    right: 0,
    borderTopRightRadius: theme.shape.borderRadius * 2,
    transform: "translate(50%, -50%)",
  },
  "& .bottom-corner-left, & .bottom-corner-right": {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: theme.palette.grey[700],
    opacity: 0,
    transition: "all 0.3s ease",
    zIndex: 1,
  },
  "& .bottom-corner-left": {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: theme.shape.borderRadius * 2,
    transform: "translate(-50%, 50%)",
  },
  "& .bottom-corner-right": {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: theme.shape.borderRadius * 2,
    transform: "translate(50%, 50%)",
  },
  "&:hover .bottom-corner-left, &:hover .bottom-corner-right": {
    opacity: 1,
  },
}));

const ScrollContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  gap: "16px",
  padding: "16px 0",
  scrollBehavior: "smooth",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const ScrollAnimationWrapper = styled(Box)({
  opacity: 0,
  transform: "translateY(20px)",
  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2, ...props }) => {
  const ref = useRef();
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ count: parseInt(target) });
    }
  }, [inView, controls, target]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, parseInt(target), {
        duration,
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return controls.stop;
    }
  }, [inView, target, duration]);

  return (
    <span ref={ref} {...props}>
      {count}
      {typeof target === "string" && target.replace(/[0-9]/g, "")}
    </span>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Testimonials data
const testimonials = [
  {
    name: "Sarah J.",
    text: "The booking process was seamless and the car was in excellent condition. Highly recommended!",
    city: "Los Angeles, CA",
  },
  {
    name: "Ahmed K.",
    text: "Great customer service and very competitive prices. Will definitely use again.",
    city: "Houston, TX",
  },
  {
    name: "Emily R.",
    text: "Loved the free pick-up and drop-off service. Made my trip so much easier!",
    city: "Miami, FL",
  },
  {
    name: "John D.",
    text: "Easy booking and friendly staff. The car was clean and ready on time.",
    city: "Dallas, TX",
  },
  {
    name: "Priya S.",
    text: "Affordable rates and a wide selection of vehicles. Will recommend to friends.",
    city: "New York, NY",
  },
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll animation observer
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".scroll-animation").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Vehicle categories auto-scroll (not testimonials)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 2;
    const interval = setInterval(() => {
      if (!container) return;
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <DirectionsCar fontSize="large" color="primary" />,
      title: "First Class services",
      description:
        "Experience premium car rental services with our luxury fleet and personalized attention.",
    },
    {
      icon: <SupportAgent fontSize="large" color="primary" />,
      title: "24/7 road assistance",
      description:
        "Our support team is available round the clock to assist you with any issues on the road.",
    },
    {
      icon: <LocalOffer fontSize="large" color="primary" />,
      title: "Quality at Minimum",
      description:
        "Get high-quality vehicles at competitive prices without compromising on service.",
    },
    {
      icon: <AirportShuttle fontSize="large" color="primary" />,
      title: "Free Pick-Up & Drop-Off",
      description:
        "Enjoy complimentary pick-up and drop-off services at major locations.",
    },
  ];

  const services = [
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: "Phone Reservation",
      description:
        "Book your car easily through our 24/7 phone reservation service.",
    },
    {
      icon: <LocalOffer fontSize="large" color="primary" />,
      title: "Special Rates",
      description:
        "Exclusive discounts for long-term rentals and frequent customers.",
    },
    {
      icon: <DirectionsCar fontSize="large" color="primary" />,
      title: "One Way Rental",
      description:
        "Rent a car in one location and return it to another with no extra fees.",
    },
    {
      icon: <Favorite fontSize="large" color="primary" />,
      title: "Life Insurance",
      description:
        "Comprehensive insurance coverage included with every rental.",
    },
    {
      icon: <LocationCity fontSize="large" color="primary" />,
      title: "City to City",
      description:
        "Convenient city-to-city rental options for your travel needs.",
    },
    {
      icon: <AirportShuttle fontSize="large" color="primary" />,
      title: "Free Rides",
      description: "Complimentary shuttle services to and from major airports.",
    },
  ];

  const stats = [
    {
      number: "200+",
      label: "Routes",
      subtitle: "Major Routes",
      icon: <Room sx={{ color: theme.palette.grey[900], fontSize: 32 }} />,
    },
    {
      number: "40+",
      label: "Drivers",
      subtitle: "Expert Drivers",
      icon: <People sx={{ color: theme.palette.grey[900], fontSize: 32 }} />,
    },
    {
      number: "8000+",
      label: "Customers",
      subtitle: "Happy Customers",
      icon: <Star sx={{ color: theme.palette.grey[900], fontSize: 32 }} />,
    },
    {
      number: "1000+",
      label: "Trips",
      subtitle: "Completed Trips",
      icon: (
        <CheckCircleOutline
          sx={{ color: theme.palette.grey[900], fontSize: 32 }}
        />
      ),
    },
  ];

  const vehicleCategories = [
    "Economy",
    "Compact",
    "Luxury",
    "Mid-size",
    "Full-size",
    "SUV",
    "Minivan",
    "Convertible",
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Form fields
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("12:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("12:00");
  const [tripType, setTripType] = useState("oneway");
  const [selectedCar, setSelectedCar] = useState("");

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return "";
    let [hours, minutes] = timeString.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = String(minutes).padStart(2, "0");
    return `${hours}:${minutes} ${ampm}`;
  };

  // WhatsApp handler
  const handleWhatsAppBooking = () => {
    const formattedPickupDate = formatDateForDisplay(pickupDate);
    const formattedPickupTime = formatTimeForDisplay(pickupTime);
    const formattedDropoffDate = formatDateForDisplay(dropoffDate);
    const formattedDropoffTime = formatTimeForDisplay(dropoffTime);

    const message = `*New Booking Request* 🚗💨

*Car Type:* ${selectedCar || "Not selected"}
*Trip Type:* ${tripType === "oneway" ? "One Way" : "Round Trip"}
*Pickup Location:* ${pickup || "Not specified"}
*Dropoff Location:* ${dropoff || "Not specified"}
*Pickup Date:* ${formattedPickupDate || "Not specified"}
*Pickup Time:* ${formattedPickupTime || "Not specified"}
${
  tripType === "round"
    ? `*Dropoff Date:* ${
        formattedDropoffDate || "Not specified"
      }\n*Dropoff Time:* ${formattedDropoffTime || "Not specified"}`
    : ""
}`;

    const encodedMessage = encodeURIComponent(message);

    // Add country code (India = 91) before the phone number
    const phoneNumberWithCountryCode = "919443495741";

    // Open WhatsApp with the message
    window.open(
      `https://wa.me/${phoneNumberWithCountryCode}?text=${encodedMessage}`
    );
  };

  // Testimonials carousel logic
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialCount = testimonials.length;
  const testimonialScrollRef = useRef(null);
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-advance every 4s (always, not just mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(
        (prev) => (prev + (isMobile ? 1 : 2)) % testimonialCount
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialCount]);

  // Animation helper
  const handleChangeTestimonial = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    setTestimonialIndex((prev) =>
      dir === "next"
        ? (prev + 1) % testimonialCount
        : (prev - 1 + testimonialCount) % testimonialCount
    );
  };

  // Touch events for swipe
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 50) handleChangeTestimonial("prev");
    else if (delta < -50) handleChangeTestimonial("next");
    setTouchStartX(null);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Helmet>
        <title>Zeenath Tours | Premium Car Tours in Karaikudi</title>
        <meta
          name="description"
          content="Premium car Tours services in Karaikudi. Experience luxury, 24/7 support, and free pick-up & drop-off with Zeenath Tours."
        />
        <meta
          name="keywords"
          content="car Tours, Karaikudi, premium cars, Zeenath Tours, luxury car hire"
        />
      </Helmet>
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Box
            sx={{
              background: "#f7f7f9",
              minHeight: { xs: "auto", md: "50vh" },
              height: { xs: "auto", md: "70vh" },
              width: { xs: "100%", md: "180vh" }, // Fixed mobile width
              maxWidth: { md: "100%" }, // Prevent overflow on desktop
              maxHeight: { md: "620px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 2, md: 4 },
              py: { xs: 4, md: 2 },
              my: 4,
              borderRadius: { xs: 0, md: 3 },
              boxShadow: { md: "0 8px 32px rgba(0,0,0,0.06)" },
              position: "relative",
              overflow: "hidden",
              marginLeft: { xs: 0, md: "102px" }, // Only apply on desktop
              border: "1px solid #e0e0e0",
            }}
          >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
              <Grid container alignItems="center" spacing={{ xs: 2, md: 3 }}>
                {/* Left: Text - Mobile First Approach */}
                <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 800,
                      color: "#181818",
                      fontSize: { xs: "1.8rem", md: "3rem" }, // Adjusted mobile font
                      lineHeight: 1.1,
                      mb: 1,
                      textAlign: { xs: "center", md: "left" }, // Center on mobile
                    }}
                  >
                    Premium Tours services <br />
                    <span style={{ color: "#222" }}>in Karaikudi</span>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#444",
                      fontSize: { xs: "0.9rem", md: "1.1rem" }, // Adjusted mobile font
                      mb: 2,
                      maxWidth: 420,
                      textAlign: { xs: "center", md: "left" }, // Center on mobile
                      mx: { xs: "auto", md: 0 }, // Center on mobile
                    }}
                  >
                    Don't deny yourself the pleasure of driving the best premium
                    cars from around the world here and now.
                  </Typography>
                  <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: "40px",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 700,
                        backgroundColor: "#181818",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                        mb: 3,
                      }}
                      onClick={() => {
                        const form = document.getElementById("booking-form");
                        if (form) {
                          form.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>

                  {/* Logo Grid - Mobile Optimized */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      gap: { xs: 1.5, md: 2 },
                      mb: { xs: 4, md: 7 },
                      width: "100%",
                    }}
                  >
                    {[force, Innova, shift, Urbania].map((logo, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: { xs: 50, md: 50 }, // Adjusted mobile size
                          height: { xs: 30, md: 30 },
                          minWidth: { xs: 50, md: 50 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "& img": {
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                            objectFit: "contain",
                            filter: "grayscale(100%)",
                            opacity: 2.7, // Fixed opacity value (was 2.7)
                            transition: "all 0.3s ease",
                            "&:hover": {
                              filter: "grayscale(0%)",
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <img
                          src={logo}
                          alt={
                            ["Force", "Innova", "Swift Dzire", "Urbania"][index]
                          }
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Right: Car Image - Mobile Second */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    order: { xs: 1, md: 2 }, // Image first on mobile
                    mb: { xs: 2, md: 0 }, // Add margin bottom on mobile
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      minWidth: { xs: "350px", md: "570px" }, // Limit mobile width
                      height: { xs: "200px", md: "400px" }, // Fixed mobile height
                      borderRadius: "18px",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                      position: "relative",
                      overflow: "hidden",
                      ml: { md: -15 },
                    }}
                  >
                    <Box
                      component="img"
                      src={map}
                      alt="Map background"
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 1,
                        opacity: 0.3,
                      }}
                    />
                    <Box
                      component="img"
                      src={vanss}
                      alt="Car"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        position: "relative",
                        zIndex: 2,
                        transform: {
                          xs: "scale(1.5)", // Reduced scale on mobile
                          md: "scale(1.4)",
                        },
                        transformOrigin: "left center",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Search Form */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Container
            id="booking-form"
            sx={{ py: 2, mt: 1, position: "relative", zIndex: 2 }}
          >
            <AnimatedCard
              elevation={6}
              sx={{
                borderRadius: "15px",
                boxShadow: theme.shadows[10],
                background: theme.palette.background.paper,
              }}
            >
              <Box className="bottom-corner-left" />
              <Box className="bottom-corner-right" />
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    textAlign: "center",
                    color: theme.palette.text.primary,
                  }}
                >
                  Book Your Ride Now
                </Typography>

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    "&::before, &::after": {
                      content: '""',
                      flex: 1,
                      borderBottom: `2px solid ${theme.palette.divider}`,
                      margin: "0 10px",
                    },
                  }}
                >
                  Select Your Car Type
                </Typography>

                {/* Trip Type Button Group */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    variant={tripType === "oneway" ? "contained" : "outlined"}
                    color="primary"
                    sx={{
                      borderRadius: "30px",
                      fontWeight: 600,
                      px: 3,
                      boxShadow:
                        tripType === "oneway" ? theme.shadows[4] : "none",
                      textTransform: "none",
                      backgroundColor:
                        tripType === "oneway"
                          ? theme.palette.grey[900]
                          : undefined,
                      "&:hover": {
                        backgroundColor:
                          tripType === "oneway"
                            ? theme.palette.grey[800]
                            : undefined,
                      },
                    }}
                    onClick={() => setTripType("oneway")}
                  >
                    One Way Trip
                  </Button>
                  <Button
                    variant={tripType === "round" ? "contained" : "outlined"}
                    color="primary"
                    sx={{
                      borderRadius: "30px",
                      fontWeight: 600,
                      px: 3,
                      boxShadow:
                        tripType === "round" ? theme.shadows[4] : "none",
                      textTransform: "none",
                      backgroundColor:
                        tripType === "round"
                          ? theme.palette.grey[900]
                          : undefined,
                      "&:hover": {
                        backgroundColor:
                          tripType === "round"
                            ? theme.palette.grey[800]
                            : undefined,
                      },
                    }}
                    onClick={() => setTripType("round")}
                  >
                    Round Trip
                  </Button>
                </Box>

                {/* Select Car Dropdown */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    select
                    label="Select Car"
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    fullWidth
                    variant="outlined"
                    SelectProps={{ native: true }}
                    sx={{
                      borderRadius: "12px",
                      background: theme.palette.background.paper,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <option value=""></option>
                    <option value="Urbania van">Urbania (Van)</option>
                    <option value="Force Tempo">Force (Tempo)</option>
                    <option value="Innova">Assured Innova</option>
                    <option value="Shift Dzire">Shift Dzire</option>
                    <option value="BUS">BUS</option>
                  </TextField>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: "1.1rem",
                      }}
                    >
                      Pick Up
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <TextField
                        fullWidth
                        label="Enter a City or Airport"
                        variant="outlined"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          sx={{
                            "&.Mui-checked": {
                              color: theme.palette.grey[900],
                            },
                          }}
                        />
                      }
                      label="Need a different drop-off location?"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: "1.1rem",
                      }}
                    >
                      Drop off
                    </Typography>
                    <TextField
                      fullWidth
                      label="Enter a City or Airport"
                      variant="outlined"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: "1.1rem",
                      }}
                    >
                      Pick Up Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        placeholder: "dd.mm.yyyy",
                      }}
                      sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    {pickupDate && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: theme.palette.text.secondary }}
                      >
                        Selected: {formatDateForDisplay(pickupDate)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: "1.1rem",
                      }}
                    >
                      Pick Up Time
                    </Typography>
                    <TextField
                      fullWidth
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      variant="outlined"
                      sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                    {pickupTime && (
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: theme.palette.text.secondary }}
                      >
                        Selected: {formatTimeForDisplay(pickupTime)}
                      </Typography>
                    )}
                  </Grid>
                  {tripType === "round" && (
                    <>
                      <Grid item xs={12} md={3}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontSize: "1.1rem",
                          }}
                        >
                          Drop Off Date
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          variant="outlined"
                          value={dropoffDate}
                          onChange={(e) => setDropoffDate(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            mt: 1,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                        {dropoffDate && (
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, color: theme.palette.text.secondary }}
                          >
                            Selected: {formatDateForDisplay(dropoffDate)}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontSize: "1.1rem",
                          }}
                        >
                          Drop Off Time
                        </Typography>
                        <TextField
                          fullWidth
                          type="time"
                          value={dropoffTime}
                          onChange={(e) => setDropoffTime(e.target.value)}
                          variant="outlined"
                          sx={{
                            mt: 1,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />
                        {dropoffTime && (
                          <Typography
                            variant="body2"
                            sx={{ mt: 1, color: theme.palette.text.secondary }}
                          >
                            Selected: {formatTimeForDisplay(dropoffTime)}
                          </Typography>
                        )}
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        mt: 3,
                        backgroundColor: theme.palette.grey[900],
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
                          backgroundColor: theme.palette.grey[800],
                        },
                        transition: "all 0.3s ease",
                      }}
                      onClick={handleWhatsAppBooking}
                    >
                      Book now via WhatsApp
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
              <Box
                sx={{
                  mb: 4,
                  p: 2,
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Phone
                  fontSize="small"
                  sx={{ verticalAlign: "middle", marginRight: "12px" }}
                />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  For immediate booking confirmation, call us at{" "}
                  <a
                    href="tel:+919443495741"
                    style={{
                      color: theme.palette.text.primary,
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    +91 9443495741
                  </a>
                </Typography>
              </Box>
            </AnimatedCard>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              Zeenath Tours{" "}
              <span
                style={{
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                FEATURES
              </span>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >
              We provide exceptional car rental services with a focus on
              quality, reliability, and customer satisfaction. Our features are
              designed to make your rental experience seamless and enjoyable.
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <AnimatedCard
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    <Box className="bottom-corner-left" />
                    <Box className="bottom-corner-right" />
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* About Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Box
            sx={{
              py: 8,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Container>
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                  >
                    <span
                      style={{
                        color: theme.palette.text.primary,
                        fontWeight: 700,
                        display: "inline-block",
                      }}
                    >
                      ABOUT
                    </span>
                    {" Zeenath Tours"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    sx={{ fontSize: "1.1rem" }}
                  >
                    Located in the heart of Karaikudi, Zeenath Tours has been a
                    trusted name in the travel and transport industry for over
                    25 years. With a strong commitment to comfort, hygiene, and
                    reliability, we proudly serve customers traveling to any
                    destination across South India and beyond.
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <CheckCircle
                        sx={{ mt: 0.5, color: theme.palette.grey[900] }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Our Vision
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          To revolutionize the car rental industry through
                          innovation and customer-centric services.
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <CheckCircle
                        sx={{ mt: 0.5, color: theme.palette.grey[900] }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Our Mission
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          To provide reliable, affordable, and high-quality car
                          rental services to our valued customers.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 3, fontSize: "1.1rem" }}
                  >
                    With over 8000+ satisfied clients, our reputation is built
                    on delivering clean, well-maintained vehicles, experienced
                    drivers, and exceptional customer service. Whether it's
                    family trips, business travel, or group tours, Zeenath Tours
                    ensures every journey is safe, smooth, and memorable. At
                    Zeenath Tours, your satisfaction is our destination.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "400px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: theme.shadows[10],
                    }}
                  >
                    <Box
                      component="img"
                      src={images.aboutImage}
                      alt="About Us"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      25 Years Of Experience
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        "24/7 Customer Support",
                        "Wide Range of Vehicles",
                        "Competitive Pricing",
                        "Nationwide Coverage",
                      ].map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CheckCircle color="primary" />
                            <Typography sx={{ fontWeight: 500 }}>
                              {item}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* One Way Trip Tariffs Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #000000, #666666)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              One Way Trip <span style={{ color: "#222" }}>Tariffs</span>
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 5, maxWidth: 600, mx: "auto" }}
            >
              Transparent pricing with no hidden charges. Choose the perfect
              vehicle for your journey.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  name: "Urbania van",
                  reviews: 1758,
                  price: 140,
                  minKm: 130,
                  rating: 4.5,
                  img: van,
                },
                {
                  name: "Innova",
                  reviews: 2564,
                  price: 100,
                  minKm: 130,
                  rating: 4.7,
                  img: van6,
                },
                {
                  name: "Swift Dzire",
                  reviews: 1658,
                  price: 80,
                  minKm: 130,
                  rating: 5,
                  img: van5,
                },
              ].map((car, idx) => (
                <Grid item xs={12} sm={6} md={4} key={car.name}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 3,
                      p: 2,
                      position: "relative",
                      minHeight: 370,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    {/* Rating badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "#f5f5f5",
                        color: "#000000",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <span style={{ fontSize: 18, marginRight: 4 }}>★</span>
                      {car.rating}
                    </Box>
                    <Box
                      component="img"
                      src={car.img}
                      alt={car.name}
                      sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "contain",
                        mb: 2,
                        mt: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#000000" }}
                    >
                      {car.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {car.reviews} Reviews
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Price:{" "}
                      <span style={{ color: "#000000", fontWeight: 700 }}>
                        ₹{car.price}{" "}
                        <span style={{ fontWeight: 400 }}>/ Km</span>
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      Minimum KM: <b>Min {car.minKm} KM</b>
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        fontWeight: 600,
                        py: 1,
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }}
                      fullWidth
                      onClick={() => {
                        const form = document.getElementById("booking-form");
                        if (form) {
                          form.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      Book Now
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 1,
                        fontWeight: 600,
                        py: 1,
                        borderColor: "#000000",
                        color: "#000000",
                        "&:hover": {
                          borderColor: "#333333",
                          backgroundColor: "rgba(0,0,0,0.04)",
                        },
                      }}
                      fullWidth
                      startIcon={
                        <svg
                          width="20"
                          height="20"
                          fill="currentColor"
                          style={{ marginRight: 4 }}
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M10 6v4l3 2"
                            stroke="#000000"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      }
                      onClick={() => {
                        window.open("tel:9443495741");
                      }}
                    >
                      Call Now
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    background: "#ffffff",
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.1)",
                    textAlign: "center",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#f5f5f5",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#000000",
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: "2rem",
                    }}
                  >
                    <AnimatedCounter target={stat.number} />
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#000000",
                      mb: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#666666", fontSize: "1rem" }}
                  >
                    {stat.subtitle}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>

      {/* Vehicle Categories Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, color: "#000000" }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #000000, #666666)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                VEHICLE CATEGORIES
              </span>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >
              Choose from our wide selection of vehicles to suit your needs and
              budget.
            </Typography>

            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => scroll("left")}
                sx={{
                  position: "absolute",
                  left: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  display: isMobile ? "none" : "flex",
                }}
              >
                <ChevronLeft fontSize="large" style={{ color: "#000000" }} />
              </IconButton>

              <ScrollContainer ref={scrollRef}>
                {vehicleCategories.map((category, index) => (
                  <AnimatedCard
                    key={index}
                    sx={{
                      minWidth: "280px",
                      flexShrink: 0,
                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Box className="bottom-corner-left" />
                    <Box className="bottom-corner-right" />
                    <Box
                      sx={{
                        height: "180px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={images.cars[index]}
                        alt={category}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                        onError={(e) => {
                          e.target.src = "";
                          e.target.style.backgroundColor = "#e0e0e0";
                          e.target.style.display = "flex";
                          e.target.style.alignItems = "center";
                        }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mt: 2, color: "#000000" }}
                      >
                        {category}
                      </Typography>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </ScrollContainer>

              <IconButton
                onClick={() => scroll("right")}
                sx={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  display: isMobile ? "none" : "flex",
                }}
              >
                <ChevronRight fontSize="large" style={{ color: "#000000" }} />
              </IconButton>
            </Box>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Process Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <GradientBox sx={{ py: 8 }}>
            <Container>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, color: "white" }}
              >
                Zeenath Tours PROCESS
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{
                  mb: 6,
                  maxWidth: "800px",
                  mx: "auto",
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Our simple 3-step process makes renting a car quick and
                hassle-free.
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: theme.palette.primary.main,
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        boxShadow: theme.shadows[6],
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        01
                      </Typography>
                    </Avatar>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "white" }}
                    >
                      Choose A Car
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        maxWidth: "300px",
                        mx: "auto",
                      }}
                    >
                      Select from our wide range of vehicles that suit your
                      needs and preferences.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: theme.palette.primary.main,
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        boxShadow: theme.shadows[6],
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        02
                      </Typography>
                    </Avatar>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "white" }}
                    >
                      Make Reservation
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        maxWidth: "300px",
                        mx: "auto",
                      }}
                    >
                      Book your car online or through our customer service with
                      just a few clicks.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: theme.palette.primary.main,
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        boxShadow: theme.shadows[6],
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        03
                      </Typography>
                    </Avatar>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, color: "white" }}
                    >
                      Enjoy Driving
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                        maxWidth: "300px",
                        mx: "auto",
                      }}
                    >
                      Pick up your car and enjoy a comfortable and safe journey
                      to your destination.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </GradientBox>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <Container sx={{ py: 8 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                mb: 2,
              }}
            >
              GALLERY
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color={theme.palette.mode === "dark" ? "grey.400" : "grey.700"}
              sx={{
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.1rem",
              }}
            >
              Explore our fleet and see some of the best moments from Zeenath
              Tours Car Rental.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                mb: 6,
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "grey.100",
                p: 4,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)"
                }`,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  backgroundImage: `url(${van})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                    borderRadius: 2,
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-end" },
                  gap: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: "center", md: "right" },
                    color:
                      theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  }}
                >
                  Discover our complete vehicle collection in the gallery
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/gallery")}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "grey.800" : "grey.900",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "grey.700" : "grey.800",
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  View Full Gallery
                </Button>
              </Box>
            </Box>

            {/* Client Testimonials Section */}
            <Box
              sx={{
                mt: 10,
                py: 6,
                px: { xs: 1, sm: 4 },
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                boxShadow: theme.shadows[2],
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.900" : "grey.100",
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)"
                }`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${testimonial})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  //opacity: theme.palette.mode === "dark" ? 0.15 : 0.1,
                  zIndex: 0,
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === "dark" ? "#ffffff" : "#fff",
                    mb: 2,
                  }}
                >
                  CLIENT TESTIMONIALS
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color={theme.palette.mode === "dark" ? "#ffffff" : "#fff"}
                  sx={{
                    mb: 6,
                    maxWidth: "700px",
                    mx: "auto",
                    fontSize: "1.1rem",
                  }}
                >
                  See what our happy customers have to say about their
                  experience with Zeenath Tours Car Rental.
                </Typography>
                <Box sx={{ position: "relative", maxWidth: 700, mx: "auto" }}>
                  {/* Left Arrow */}
                  <IconButton
                    onClick={() => handleChangeTestimonial("prev")}
                    sx={{
                      position: "absolute",
                      left: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                      boxShadow: theme.shadows[4],
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "grey.700"
                            : "grey.300",
                      },
                      display: testimonialCount > 2 ? "flex" : "none",
                    }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft fontSize="large" />
                  </IconButton>

                  {/* Testimonial Cards */}
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      overflow: "hidden",
                      minHeight: 250,
                      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
                      opacity: animating ? 0 : 1,
                      transform: animating
                        ? "translateX(40px)"
                        : "translateX(0)",
                    }}
                    onTouchStart={isMobile ? handleTouchStart : undefined}
                    onTouchEnd={isMobile ? handleTouchEnd : undefined}
                  >
                    {Array.from({ length: isMobile ? 1 : 2 }).map((_, idx) => {
                      const tIndex =
                        (testimonialIndex + idx) % testimonialCount;
                      const testimonial = testimonials[tIndex];
                      return (
                        <Grid item xs={12} md={6} key={testimonial.name}>
                          <AnimatedCard
                            sx={{
                              textAlign: "center",
                              p: 3,
                              minHeight: 220,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? "grey.800"
                                  : "#fff",
                              border: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(0,0,0,0.1)"
                              }`,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor:
                                  theme.palette.mode === "dark"
                                    ? "grey.700"
                                    : "grey.500",
                                color: "#fff",
                                mx: "auto",
                                mb: 2,
                                width: 56,
                                height: 56,
                                fontSize: 28,
                              }}
                            >
                              {testimonial.name[0]}
                            </Avatar>
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 2,
                                fontStyle: "italic",
                                color:
                                  theme.palette.mode === "dark"
                                    ? "grey.300"
                                    : "grey.800",
                              }}
                            >
                              "{testimonial.text}"
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "#000",
                              }}
                            >
                              {testimonial.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color={
                                theme.palette.mode === "dark"
                                  ? "grey.500"
                                  : "grey.600"
                              }
                            >
                              {testimonial.city}
                            </Typography>
                          </AnimatedCard>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Right Arrow */}
                  <IconButton
                    onClick={() => handleChangeTestimonial("next")}
                    sx={{
                      position: "absolute",
                      right: -20,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                      boxShadow: theme.shadows[4],
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "grey.700"
                            : "grey.300",
                      },
                      display: testimonialCount > 2 ? "flex" : "none",
                    }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight fontSize="large" />
                  </IconButton>

                  {/* Dots for mobile */}
                  {isMobile && (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      {testimonials.map((_, idx) => (
                        <Box
                          key={idx}
                          onClick={() => setTestimonialIndex(idx)}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            mx: 0.5,
                            backgroundColor:
                              idx === testimonialIndex
                                ? theme.palette.mode === "dark"
                                  ? "#fff"
                                  : "#000"
                                : theme.palette.mode === "dark"
                                ? "grey.600"
                                : "grey.400",
                            cursor: "pointer",
                            transition: "background 0.3s",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>
    </Box>
  );
};

export default HomePage;
