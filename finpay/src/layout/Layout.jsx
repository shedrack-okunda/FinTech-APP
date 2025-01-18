import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: isSidebarOpen ? "block" : "none", md: "block" },
          position: { xs: "relative", md: "fixed" },
          zIndex: 1200,
          width: { xs: "140px", md: "140px" },
        }}
      >
        <Sidebar isOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          paddingTop: "90px",
          marginTop: "20px",
          transition: "margin-left 0.3s ease",
          marginLeft: { xs: isSidebarOpen ? "100px" : "0px", md: "120px" },
        }}
      >
        {/* Navbar */}
        <Navbar onSidebarToggle={handleSidebarToggle} />
        {/* Children Content */}
        <Outlet />
      </Box>
    </Box>
  );
};
