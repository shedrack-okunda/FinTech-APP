import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router";
import {
  ArrowDropDown,
  AutorenewRounded,
  DescriptionRounded,
  MenuOpenRounded,
  NotificationsRounded,
  RocketLaunchRounded,
  SyncAltRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectLoggedInUser } from "../features/auth/AuthSlice";

const actions = [
  { icon: <RocketLaunchRounded />, text: "Send Money" },
  { icon: <SyncAltRounded />, text: "Fund Wallet" },
  { icon: <AutorenewRounded />, text: "Convert Funds" },
  { icon: <DescriptionRounded />, text: "Create new Invoice" },
];

export const Navbar = ({ onSidebarToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const [greeting, setGreeting] = useState("");
  const loggedInUser = useSelector(SelectLoggedInUser);

  // determines the greeting based on the current time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours < 18) {
      setGreeting("Good afternoon");
    } else if (hours < 22) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, []);

  const titles = {
    "/": `Welcome, ${loggedInUser?.firstName || "Sheddy"}`,
    "/invoices": "Invoices",
    "/cards": "Cards",
    "/wallets": "Wallets",
    "/transactions": "Transactions",
  };

  const title =
    titles[location.pathname] ||
    `Welcome, ${loggedInUser?.firstName || "Sheddy"}`;
  const subtitle = title.includes("Welcome")
    ? `${greeting}, have a great day!`
    : "";

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color={theme.palette.primary.main}
        elevation={0}
        sx={{
          boxShadow: "none",
          width: { xs: "100%", md: "100vw" },
        }}
      >
        <Toolbar
          sx={{ p: 1.2, mt: "5px", borderBottom: "2px solid #ccc" }}
          style={{ justifyContent: "space-between" }}
        >
          {/* Sidebar Toggle Icon for Small Screens */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={onSidebarToggle}
          >
            <MenuOpenRounded />
          </IconButton>

          <Box sx={{ ml: { lg: "15rem" } }}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>

          <Box display="flex" gap={2} alignItems="center">
            {/* Quick Actions Button */}
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<ArrowDropDown />}
              onClick={handleMenuClick}
              sx={{
                textTransform: "none",
                border: "1px solid #ccc",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              Quick Actions
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {actions.map((action, index) => (
                <Box key={index} sx={{ p: 1 }}>
                  <MenuItem
                    onClick={handleClose}
                    sx={{ borderBottom: "1px solid #ccc", gap: 1 }}
                  >
                    <Box sx={{ color: "#7105E9" }}>{action.icon}</Box>
                    {action.text}
                  </MenuItem>
                </Box>
              ))}
            </Menu>

            {/* Notification Bell */}
            <IconButton
              sx={{
                border: "1px solid #ccc",
                borderRadius: "50%",
                color: "#7105E9",
              }}
            >
              <NotificationsRounded />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
