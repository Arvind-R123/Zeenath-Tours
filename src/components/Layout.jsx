import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Package, LogOut } from "lucide-react";
import { Header } from "./header/Header";
import { SideBar } from "./sidebar/SideBar";
import { Grid } from "@mui/material";

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Grid container>
      <Header
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        logout={handleLogout}
      ></Header>
      <Grid container spacing={0}>
        {openSidebar ? (
          <Grid item md={2}>
            <SideBar />
          </Grid>
        ) : (
          ""
        )}
        <Grid md={openSidebar ? 10 : 12} marginTop={1}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
