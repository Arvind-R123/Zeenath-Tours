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
} from "@mui/icons-material";
import Phone from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView, animate } from "framer-motion";
import { useCallback } from "react";
import { Room, People, Star, CheckCircleOutline } from "@mui/icons-material";

// Import all images from assets
import car1 from "../../assets/car1.jpg";
import car2 from "../../assets/car2.jpg";
import car3 from "../../assets/car3.jpg";
import car4 from "../../assets/car4.png";
import car5 from "../../assets/car5.jpg";
import car6 from "../../assets/car6.jpg";
import car7 from "../../assets/car7.jfif";
import car8 from "../../assets/car8.avif";
import heroBg from "../../assets/car1.jpg";
import ctaBg from "../../assets/car2.jpg";
import aboutImage from "../../assets/car9.JPG";
import blog1 from "../../assets/blog.jpeg";
import blog2 from "../../assets/blog2.webp";
import blog3 from "../../assets/blog3.jpeg";

// Image object with all imported images
const images = {
  heroBg,
  ctaBg,
  aboutImage,
  blog1,
  blog2,
  blog3,
  cars: [car1, car2, car3, car4, car5, car6, car7, car8],
};

// Custom styled components
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
    backgroundColor: theme.palette.primary.light,
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
    backgroundColor: theme.palette.primary.light,
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
      number: "100+",
      label: "Routes",
      subtitle: "Major Routes",
      icon: <Room sx={{ color: "#1976d2", fontSize: 32 }} />,
    },
    {
      number: "30+",
      label: "Drivers",
      subtitle: "Expert Drivers",
      icon: <People sx={{ color: "#1976d2", fontSize: 32 }} />,
    },
    {
      number: "300+",
      label: "Customers",
      subtitle: "Happy Customers",
      icon: <Star sx={{ color: "#1976d2", fontSize: 32 }} />,
    },
    {
      number: "1000+",
      label: "Trips",
      subtitle: "Completed Trips",
      icon: <CheckCircleOutline sx={{ color: "#1976d2", fontSize: 32 }} />,
    },
  ];

  const vehicleCategories = [
    "Economy",
    "Compact",
    "Mid-size",
    "Full-size",
    "Luxury",
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
    window.open(`https://wa.me/9790618699?text=${encodedMessage}`);
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
              backgroundImage: `url(${images.heroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
              },
            }}
          >
            <Container
              sx={{
                position: "relative",
                zIndex: 1,
                color: "white",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  fontSize: isMobile ? "2.5rem" : "3.5rem",
                }}
              >
                CONTINUE CAR RESERVATION
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 4, fontWeight: 300 }}
              >
                Find the perfect car for your needs
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
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
            sx={{ py: 6, mt: -8, position: "relative", zIndex: 2 }}
          >
            <AnimatedCard
              elevation={6}
              sx={{
                borderRadius: "15px",
                boxShadow: theme.shadows[10],
                background: "rgba(255,255,255,0.95)",
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
                    color: theme.palette.primary.main,
                    mb: 4,
                    textAlign: "center",
                    background:
                      "linear-gradient(45deg, #573BFE 30%, #01C0F6 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
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
                      background: "#f7f9fc",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <option value=""></option>
                    <option value="Sedan">Sedan (Dzire/Etios)</option>
                    <option value="SUV">SUV (Xylo/Ertiga)</option>
                    <option value="Innova">Assured Innova</option>
                    <option value="Luxury">Luxury</option>
                  </TextField>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.dark,
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
                              color: theme.palette.primary.main,
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
                        color: theme.palette.primary.dark,
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
                        color: theme.palette.primary.dark,
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
                      <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                        Selected: {formatDateForDisplay(pickupDate)}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.dark,
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
                      <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
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
                            color: theme.palette.primary.dark,
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
                            sx={{ mt: 1, color: "#666" }}
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
                            color: theme.palette.primary.dark,
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
                            sx={{ mt: 1, color: "#666" }}
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
                        background:
                          "linear-gradient(45deg, #573BFE 30%, #01C0F6 90%)",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
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
                  border: "1px solid #cfd8dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <Phone
                  fontSize="small"
                  sx={{ verticalAlign: "middle", marginRight: "12px" }}
                />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  For immediate booking confirmation, call us at{" "}
                  <a
                    href="tel:+919790618699"
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    +91 9790618699
                  </a>
                </Typography>
              </Box>
            </AnimatedCard>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>

      {/* Promotion */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ScrollAnimationWrapper className="scroll-animation">
          <GradientBox
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <Container>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 700, mb: 2 }}
              >
                Get 15% off your rental
              </Typography>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 3, fontWeight: 300 }}
              >
                Plan your trip now
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 4, fontStyle: "italic" }}
              >
                Treat yourself in USA
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
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
            </Container>
          </GradientBox>
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
                  background: "linear-gradient(90deg, #2e7dff, #00c853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
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
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
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
              background:
                "linear-gradient(135deg, rgba(247,249,252,1) 0%, rgba(240,242,245,1) 100%)",
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
                        background: "linear-gradient(90deg, #2e7dff, #00c853)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
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
                    Founded in 2005, Zeenath Tours Car Rental has grown to
                    become one of the most trusted names in the car rental
                    industry. We pride ourselves on offering top-quality
                    vehicles and exceptional customer service.
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <CheckCircle color="primary" sx={{ mt: 0.5 }} />
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
                      <CheckCircle color="primary" sx={{ mt: 0.5 }} />
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
                    With a fleet of over 50 vehicles and a team of dedicated
                    professionals, we are committed to making your journey
                    comfortable and memorable. Our services are available in
                    multiple cities across the country.
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
                      17 Years Of Experience
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
                background: "linear-gradient(90deg, #2e7dff, #00c853)",
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
                  name: "Sedan (Dzire/Etios)",
                  reviews: 1758,
                  price: 14,
                  minKm: 130,
                  rating: 4.5,
                  img: car1,
                },
                {
                  name: "SUV (Xylo/Ertiga)",
                  reviews: 2564,
                  price: 19,
                  minKm: 130,
                  rating: 4.7,
                  img: car2,
                },
                {
                  name: "Assured Innova",
                  reviews: 1658,
                  price: 20,
                  minKm: 130,
                  rating: 5,
                  img: aboutImage,
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
                    }}
                  >
                    {/* Rating badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "#ffe082",
                        color: "#222",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
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
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                      <span style={{ color: "#1976d2", fontWeight: 700 }}>
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
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, fontWeight: 600, py: 1 }}
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
                      color="primary"
                      fullWidth
                      sx={{ mt: 1, fontWeight: 600, py: 1 }}
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
                            stroke="#1976d2"
                            strokeWidth="2"
                            fill="none"
                          />
                          <path
                            d="M10 6v4l3 2"
                            stroke="#1976d2"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                      }
                      onClick={() => {
                        window.open("tel:9790618699");
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
                    background: "#f8faff",
                    boxShadow: "0 2px 12px 0 rgba(80,112,255,0.06)",
                    textAlign: "center",
                    minHeight: 180,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#eaf2ff",
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
                      color: "#1976d2",
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
                      color: "#222",
                      mb: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#7b809a", fontSize: "1rem" }}
                  >
                    {stat.subtitle}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>

      {/* Services Section */}
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
              background:
                "linear-gradient(135deg, rgba(247,249,252,1) 0%, rgba(240,242,245,1) 100%)",
            }}
          >
            <Container>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                Zeenath Tours{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #2e7dff, #00c853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    fontWeight: 700,
                    display: "inline-block",
                  }}
                >
                  SERVICES
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
                Our comprehensive range of services is designed to meet all your
                car rental needs, whether for business or leisure.
              </Typography>
              <Grid container spacing={4}>
                {services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <AnimatedCard
                      sx={{
                        height: "100%",
                        backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                      }}
                    >
                      <Box className="bottom-corner-left" />
                      <Box className="bottom-corner-right" />
                      <CardContent sx={{ textAlign: "center", p: 4 }}>
                        <Box sx={{ mb: 3 }}>{service.icon}</Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.95rem" }}
                        >
                          {service.description}
                        </Typography>
                      </CardContent>
                    </AnimatedCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </ScrollAnimationWrapper>
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
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #2e7dff, #00c853)",
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
                  backgroundColor: "white",
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  display: isMobile ? "none" : "flex",
                }}
              >
                <ChevronLeft fontSize="large" />
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
                      boxShadow: theme.shadows[4],
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
                          e.target.style.backgroundColor =
                            theme.palette.grey[400];
                          e.target.style.display = "flex";
                          e.target.style.alignItems = "center";
                        }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
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
                  backgroundColor: "white",
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  display: isMobile ? "none" : "flex",
                }}
              >
                <ChevronRight fontSize="large" />
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
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              <span
                style={{
                  background: "linear-gradient(90deg, #2e7dff, #00c853)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                GALLERY
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
              Explore our fleet and see some of the best moments from Zeenath
              Tours Car Rental.
            </Typography>
            <Grid container spacing={4}>
              {images.cars.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <AnimatedCard>
                    <Box className="bottom-corner-left" />
                    <Box className="bottom-corner-right" />
                    <Box
                      component="img"
                      src={img}
                      alt={`Gallery Car ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 240,
                        objectFit: "cover",
                        borderRadius: 3,
                        transition: "transform 0.5s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>

            {/* Client Testimonials Section */}
            <Box
              sx={{
                mt: 10,
                py: 6,
                px: { xs: 1, sm: 4 },
                borderRadius: 4,
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #f3f6fb 0%, #e9ecf3 100%)"
                    : "linear-gradient(135deg, #23272f 0%, #181b20 100%)",
                boxShadow: theme.shadows[2],
              }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, color: theme.palette.text.primary }}
              >
                <span
                  style={{
                    background: "linear-gradient(90deg, #2e7dff, #00c853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    fontWeight: 700,
                    display: "inline-block",
                  }}
                >
                  CLIENT TESTIMONIALS
                </span>
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{
                  mb: 6,
                  maxWidth: "700px",
                  mx: "auto",
                  fontSize: "1.1rem",
                }}
              >
                See what our happy customers have to say about their experience
                with Zeenath Tours Car Rental.
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
                    backgroundColor: "white",
                    boxShadow: theme.shadows[4],
                    "&:hover": { backgroundColor: "white" },
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
                    transform: animating ? "translateX(40px)" : "translateX(0)",
                  }}
                  onTouchStart={isMobile ? handleTouchStart : undefined}
                  onTouchEnd={isMobile ? handleTouchEnd : undefined}
                >
                  {Array.from({ length: isMobile ? 1 : 2 }).map((_, idx) => {
                    // Calculate the correct testimonial index for each card
                    const tIndex = (testimonialIndex + idx) % testimonialCount;
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
                            background: theme.palette.background.paper,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.primary.main,
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
                            sx={{ mb: 2, fontStyle: "italic" }}
                          >
                            "{testimonial.text}"
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
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
                    backgroundColor: "white",
                    boxShadow: theme.shadows[4],
                    "&:hover": { backgroundColor: "white" },
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
                              ? theme.palette.primary.main
                              : theme.palette.grey[400],
                          cursor: "pointer",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </ScrollAnimationWrapper>
      </motion.div>
    </Box>
  );
};

export default HomePage;
