import {
  CreditCardRounded,
  DashboardRounded,
  DescriptionRounded,
  ExitToApp,
  SyncAltRounded,
  WalletRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SelectLoggedInUser } from "../features/auth/AuthSlice";

export const Sidebar = ({ isOpen, onSidebarToggle }) => {
  const [showProfile, setShowProfile] = useState(false);
  const loggedInUser = useSelector(SelectLoggedInUser);

  // Check for screen size
  const isLargeScreen = useMediaQuery("(min-width:960px)");

  const items = [
    { text: "Dashboard", icon: <DashboardRounded />, path: "/" },
    { text: "Invoices", icon: <DescriptionRounded />, path: "/invoices" },
    { text: "Cards", icon: <CreditCardRounded />, path: "/cards" },
    { text: "Wallets", icon: <WalletRounded />, path: "/wallets" },
    {
      text: "Transactions",
      icon: <SyncAltRounded />,
      path: "/transactions",
    },
  ];

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <Drawer
      open={isOpen || isLargeScreen}
      onClose={onSidebarToggle}
      variant={isLargeScreen ? "permanent" : "temporary"}
      anchor="left"
      sx={{
        width: "240px",
        "& .MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
          backgroundColor: "#7105E9",
          borderTopRightRadius: isLargeScreen ? 0 : "10px",
          borderBottomRightRadius: isLargeScreen ? 0 : "10px",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          p: 2.85,
          textAlign: "center",
          borderBottom: "2px solid #ccc",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => setShowProfile(false)}
        >
          FinTech
        </Typography>
      </Box>

      {/* Render Sidebar Items */}
      <Collapse in={!showProfile}>
        <List>
          {items.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                cursor: "pointer",
              }}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: "#fff" }}>{item.text}</ListItemText>
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>

      {/* Render Profile Section */}
      <Collapse in={showProfile}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mt: "auto",
          }}
        >
          <Avatar
            alt="Shedrack Okunda"
            src=""
            sx={{ width: 64, height: 64, mb: 1 }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            My Profile
          </Typography>
          <List>
            <ListItem button>
              <ListItemText primary="Beneficiaries" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Security" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Identification" />
            </ListItem>
          </List>
        </Box>
      </Collapse>

      <Divider sx={{ backgroundColor: "#fff", marginTop: "auto" }} />

      {/* User Profile Icon */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          cursor: "pointer",
        }}
        onClick={toggleProfile}
      >
        <Avatar
          alt="Shedrack Okunda"
          src=""
          sx={{ width: 64, height: 64, mb: 1 }}
        />
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Shedrack Okunda
        </Typography>
        <Typography variant="body2">{loggedInUser?.email}</Typography>
      </Box>

      <IconButton component={Link} to={"/logout"} sx={{ color: "#fff", mt: 1 }}>
        <ExitToApp />
      </IconButton>
    </Drawer>
  );
};
