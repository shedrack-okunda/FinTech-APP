import { useState } from "react";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { ArrowForward, DescriptionRounded } from "@mui/icons-material";
import { SearchBar } from "../components/Searchbar";

export const InvoicePage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: "1400px", // Max width for large screens
        marginLeft: { xs: "0px", md: "120px" },
      }}
    >
      {/* Search Bar */}
      <Box mb={3}>
        <SearchBar />
      </Box>

      {/* Invoice Section */}
      <Paper
        sx={{
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        {/* Tabs Section */}
        <Box
          sx={{
            borderBottom: "2px solid #ddd",
            backgroundColor: "#F4EAFD",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="invoice tabs"
            variant="scrollable" // Allows horizontal scrolling
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                minWidth: 120,
                fontWeight: 500,
                color: "#555",
              },
              "& .MuiTabs-indicator": { backgroundColor: "#8A56AC" },
              "& .Mui-selected": { color: "#8A56AC !important" },
            }}
          >
            <Tab label="All invoices" />
            <Tab label="Draft" />
            <Tab label="Pending" />
            <Tab label="Processing" />
            <Tab label="Paid" />
            <Tab label="Due" />
            <Tab label="Overdue" />
          </Tabs>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <DescriptionRounded
            sx={{
              fontSize: "5rem",
              mt: 3,
              color: "#DADADA",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            No Payments
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: 1,
              color: "#888",
              fontSize: "0.95rem",
              maxWidth: "360px",
            }}
          >
            Once you have any payments, the information will appear here.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7105E9",
              fontWeight: "bold",
              color: "#fff",
              borderRadius: "8px",
              marginTop: 3,
              textTransform: "none",
              padding: "12px 32px",
              boxShadow: "0px 4px 6px rgba(113, 5, 233, 0.3)",
              "&:hover": {
                backgroundColor: "#5801BA",
              },
            }}
            endIcon={<ArrowForward />}
          >
            New Invoice
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
