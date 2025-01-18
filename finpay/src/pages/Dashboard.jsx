import {
  Box,
  Typography,
  Grid2,
  Paper,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  Send,
  Sync,
  Receipt,
  CreditCard,
  AccountBalance,
} from "@mui/icons-material";
import { useState } from "react";

export const DashboardPage = () => {
  const [showBalance, setShowBalance] = useState(true);

  const accounts = [
    {
      title: "All Accounts",
      currency: "Available Balance",
      balance: "$10,000.00",
      icon: "A",
    },
    {
      title: "USD",
      currency: "Available Balance",
      balance: "$5,000.00",
      icon: "U",
      text: "Wire routing number, Bank code (SWIFT/BIC), Routing number (ACH or ABA), Account number",
    },
    {
      title: "GBP",
      currency: "Available Balance",
      balance: "£3,000.00",
      icon: "G",
      text: "UK sirt code, Account number, IBAN",
    },
    {
      title: "EUR",
      currency: "Available Balance",
      balance: "€2,000.00",
      icon: "E",
      text: "IBAN, Bank code (SWIFT/IBC)",
    },
    {
      title: "NGN",
      currency: "Available Balance",
      balance: "₦1,500,000.00",
      icon: "N",
    },
  ];

  const exchangeRates = [
    { currency: "EUR", buying: "1.10", selling: "1.12" },
    { currency: "USD", buying: "1.00", selling: "1.02" },
    { currency: "GBP", buying: "0.85", selling: "0.87" },
  ];

  return (
    <Box sx={{ ml: { xs: "0px", sm: "0px", md: "120px" } }}>
      {/* Account Balance Section */}
      <Paper>
        <Box sx={{ p: 1, ml: 2, width: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Account Balance
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Grid2 container spacing={3}>
            {accounts.map((account, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#6200ea" }}>{account.icon}</Avatar>
                    <Typography variant="h6" align="center">
                      {account.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    {account.currency}
                  </Typography>
                  <Typography variant="h5" align="center">
                    {index === 0 && !showBalance ? "****" : account.balance}
                  </Typography>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Paper>

      {/* Quick Actions Section */}
      <Paper sx={{ mt: 4 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 2, m: 2 }}>
          <Grid2 container spacing={3}>
            {/* Send Money */}
            <Grid2 item xs={12} sm={4}>
              <Button
                sx={{ padding: "15px 50px" }}
                startIcon={<Send />}
                variant="contained"
                color="primary"
              >
                Send Money
              </Button>
            </Grid2>

            {/* Convert Funds */}
            <Grid2 item xs={12} sm={4}>
              <Button
                sx={{ padding: "15px 50px" }}
                startIcon={<Sync />}
                variant="contained"
                color="success"
              >
                Convert Funds
              </Button>
            </Grid2>

            {/* Create New Invoice */}
            <Grid2 item xs={12} sm={4}>
              <Button
                sx={{ padding: "15px 50px" }}
                startIcon={<Receipt />}
                variant="contained"
                color="secondary"
              >
                Create Invoice
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>

      <Grid2 container spacing={3}>
        {/* Additional Components */}
        <Paper sx={{ mt: 4, width: "500px" }}>
          <Box>
            {/* Receive Payments */}
            <Grid2 item xs={12} sm={12}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Receive Payments</Typography>
              </Box>

              <Divider />

              <Box sx={{ mt: 2, p: 2 }}>
                {["US Dollar", "British Pounds", "Euros"].map(
                  (currency, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#6200ea",
                          borderRadius: "50%",
                          height: "30px",
                          width: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          p: 1,
                        }}
                      >
                        <AccountBalance />
                      </Box>

                      <Box>
                        <Typography variant="h5">{currency}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Wire routing number, Bank code (SWIFT/IBC), IBAN
                        </Typography>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </Grid2>
          </Box>
        </Paper>

        <Paper sx={{ mt: 4, width: "500px" }}>
          {/* Invoices */}
          <Grid2 item xs={12} sm={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5">Invoices</Typography>
            </Box>

            <Divider />

            <Box sx={{ mt: 2, p: 2 }}>
              {["Due", "Overdue", "Awaiting Approval"].map((status, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography>0 Persons</Typography>

                  <Typography>{status}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ p: 2, justifyContent: "center", display: "flex" }}>
              <Button
                sx={{ mt: 2, padding: "10px 40px", backgroundColor: "#6200ea" }}
                startIcon={<Receipt />}
                variant="contained"
                color="secondary"
              >
                Create New Invoice
              </Button>
            </Box>
          </Grid2>
        </Paper>
      </Grid2>

      <Grid2 container spacing={3}>
        <Paper sx={{ mt: 4, width: { xs: "570px", md: "600px" } }}>
          <Box>
            {/* Exchange Rates */}
            <Grid2 item xs={12} sm={6}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Exchange Rates</Typography>
              </Box>

              <Divider />

              <Box sx={{ mt: 2, p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Currency</Typography>
                  <Typography>Buying</Typography>
                  <Typography>Selling</Typography>
                </Box>
                <Divider />
                {exchangeRates.map((rate, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        m: 1,
                      }}
                    >
                      <Avatar>{rate.currency}</Avatar>
                      <Typography variant="h5">{rate.currency}</Typography>
                    </Box>
                    <Typography>{rate.buying}</Typography>
                    <Typography>{rate.selling}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid2>
          </Box>
        </Paper>

        <Paper sx={{ mt: 4, width: "400px" }}>
          {/* Cards */}
          <Grid2 item xs={12} sm={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5">Cards</Typography>
            </Box>

            <Divider />

            <Box sx={{ mt: 2, p: 2, textAlign: "center" }}>
              <CreditCard fontSize="large" />
              <Typography>No card yet</Typography>
              <Typography variant="body2" color="textSecondary">
                You have not created any cards.
              </Typography>
              <Button
                sx={{ mt: 2 }}
                startIcon={<CreditCard />}
                variant="contained"
                color="primary"
              >
                Create New Card
              </Button>
            </Box>
          </Grid2>
        </Paper>
      </Grid2>
    </Box>
  );
};
