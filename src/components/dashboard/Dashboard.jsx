import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DirectionsCar,
  People,
  MonetizationOn,
  CalendarToday,
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Static data for the dashboard
  const stats = [
    {
      title: "Total Cars",
      value: "42",
      icon: <DirectionsCar fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: "Active Bookings",
      value: "18",
      icon: <CalendarToday fontSize="large" />,
      color: theme.palette.secondary.main,
    },
    {
      title: "Total Customers",
      value: "156",
      icon: <People fontSize="large" />,
      color: "#4CAF50",
    },
    {
      title: "Revenue",
      value: "$24,580",
      icon: <MonetizationOn fontSize="large" />,
      color: "#FF9800",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "John Doe",
      car: "Toyota Camry",
      date: "2023-06-15",
      status: "Active",
    },
    {
      id: 2,
      customer: "Jane Smith",
      car: "Honda Civic",
      date: "2023-06-14",
      status: "Completed",
    },
    {
      id: 3,
      customer: "Robert Johnson",
      car: "Ford Mustang",
      date: "2023-06-13",
      status: "Active",
    },
    {
      id: 4,
      customer: "Emily Davis",
      car: "BMW X5",
      date: "2023-06-12",
      status: "Cancelled",
    },
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h5">{stat.value}</Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.color + "20",
                      color: stat.color,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Bookings */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recent Bookings
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.palette.grey[100],
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "12px" }}>Booking ID</th>
                  <th style={{ padding: "12px" }}>Customer</th>
                  <th style={{ padding: "12px" }}>Car</th>
                  <th style={{ padding: "12px" }}>Date</th>
                  <th style={{ padding: "12px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    style={{ borderBottom: "1px solid #eee" }}
                  >
                    <td style={{ padding: "12px" }}>#{booking.id}</td>
                    <td style={{ padding: "12px" }}>{booking.customer}</td>
                    <td style={{ padding: "12px" }}>{booking.car}</td>
                    <td style={{ padding: "12px" }}>{booking.date}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          backgroundColor:
                            booking.status === "Active"
                              ? "#E3F2FD"
                              : booking.status === "Completed"
                              ? "#E8F5E9"
                              : "#FFEBEE",
                          color:
                            booking.status === "Active"
                              ? "#1976D2"
                              : booking.status === "Completed"
                              ? "#4CAF50"
                              : "#F44336",
                        }}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Popular Cars
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {["Toyota Camry", "Honda Civic", "Ford Mustang", "BMW X5"].map(
                  (car, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        bgcolor:
                          index % 2 === 0 ? "action.hover" : "background.paper",
                        borderRadius: 1,
                      }}
                    >
                      <Typography>{car}</Typography>
                      <Typography color="text.secondary">
                        {Math.floor(Math.random() * 20) + 5} bookings
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Returns
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  {
                    car: "Toyota Camry",
                    customer: "John Doe",
                    date: "Tomorrow",
                  },
                  { car: "BMW X5", customer: "Emily Davis", date: "In 2 days" },
                  {
                    car: "Honda Civic",
                    customer: "Michael Brown",
                    date: "In 3 days",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                      bgcolor:
                        index % 2 === 0 ? "action.hover" : "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography>{item.car}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.customer}
                      </Typography>
                    </Box>
                    <Typography>{item.date}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
