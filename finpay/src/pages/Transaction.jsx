import { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { axio } from "../config/axios";
import { SearchBar } from "../components/Searchbar";

export const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axio.get(
        `/transactions/user/paginated?page=${pageNumber + 1}&limit=5`
      );
      const formattedData = data.transactions.map((tx, index) => ({
        id: index + 1 + pageNumber * 5,
        date: new Date(tx.createdAt).toLocaleDateString(),
        sender: tx.sender || "N/A",
        recipient: tx.recipient || "N/A",
        amount: `$${tx.amount.toFixed(2)}`,
        status: tx.status,
        type: tx.type,
      }));
      setTransactions(formattedData);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "sender", headerName: "Sender", width: 150 },
    { field: "recipient", headerName: "Recipient", width: 150 },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "type", headerName: "Transaction Type", width: 160 },
  ];

  return (
    <Box
      sx={{
        ml: { xs: "0px", sm: "0px", md: "120px" },
        mb: 3,
      }}
    >
      <Box mb={3}>
        <SearchBar />
      </Box>

      <Paper
        sx={{
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#F4EAFD",
            borderBottom: "2px solid #ddd",
          }}
        >
          <Typography variant="h5" sx={{ color: "#333" }}>
            Recent Transactions
          </Typography>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            loading={loading}
            pagination
            paginationMode="server"
            rowCount={totalPages * 5}
            pageSize={5}
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            sx={{
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-cell": {
                color: "#555",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F9F5FF",
                color: "#333",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#F9F5FF",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
