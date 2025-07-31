import React from "react";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import {
  CalendarToday,
  Person,
  Comment,
  ArrowForward,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const BlogPage = () => {
  const theme = useTheme();

  const blogPosts = [
    {
      title: "Explore South India's Hidden Gems with Zeenath Tours",
      excerpt:
        "From lush hill stations to serene temples, discover the lesser-known treasures of Tamil Nadu and Kerala.",
      date: "July 15, 2025",
      author: "Arun Prakash",
      comments: 9,
      category: "Destinations",
      image:
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "How to Plan a Hassle-Free Group Tour",
      excerpt:
        "Group travel made simple: Tips on booking, transport coordination, and maximizing fun with Zeenath Tours.",
      date: "June 25, 2025",
      author: "Nisha Menon",
      comments: 5,
      category: "Travel Tips",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Top Pilgrimage Routes in South India",
      excerpt:
        "A spiritual journey: Explore famous temples and religious circuits curated by Zeenath Tours.",
      date: "June 5, 2025",
      author: "Farhan Ali",
      comments: 14,
      category: "Spiritual Travel",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bb43e5a7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
            Zeenath Tours Blog
          </Typography>
          <Typography variant="h5">
            Stories, guides, and tips to inspire your next journey
          </Typography>
        </Container>
      </Box>

      {/* Blog Posts Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 6 }}
        >
          Latest Articles
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Chip
                    label={post.category}
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      mb: 2,
                      fontWeight: 700,
                    }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {post.excerpt}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    px: 3,
                    pb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {post.author.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">{post.author}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CalendarToday fontSize="small" />
                      {post.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Comment fontSize="small" />
                      {post.comments}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  endIcon={<ArrowForward />}
                  sx={{
                    width: "100%",
                    py: 1.5,
                    bgcolor: theme.palette.grey[100],
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: theme.palette.grey[200],
                    },
                  }}
                >
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;
