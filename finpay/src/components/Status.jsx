import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    date: "Aug 03",
    sender: "Nnabuife Elijah",
    recipient: "Elijah",
    amount: "-$1,708",
    status: "Successful",
    type: "Transfer",
  },
  {
    id: 2,
    date: "Aug 03",
    sender: "Nnabuife Elijah",
    recipient: "Elijah",
    amount: "-$1,708",
    status: "Refunded",
    type: "Transfer",
  },
  {
    id: 3,
    date: "Aug 03",
    sender: "Nnabuife Elijah",
    recipient: "Elijah",
    amount: "-$1,708",
    status: "Successful",
    type: "Fund Wallet",
  },
  {
    id: 4,
    date: "Aug 03",
    sender: "Nnabuife Elijah",
    recipient: "Elijah",
    amount: "-$1,708",
    status: "Successful",
    type: "Transfer",
  },
  {
    id: 5,
    date: "Aug 03",
    sender: "Nnabuife Elijah",
    recipient: "Elijah",
    amount: "-$1,708",
    status: "Successful",
    type: "Transfer",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "date", headerName: "Date", editable: true },
  {
    field: "sender",
    headerName: "Sender",
    width: 150,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "recipient",
    headerName: "Recipient",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
    renderCell: (params) => {
      let color;
      let borderColor;

      switch (params.value) {
        case "Successful":
          color = "lightgreen";
          borderColor = "#388e3c";
          break;
        default:
          color = "#000";
          borderColor = "#000";
          break;
      }

      return (
        <Button
          sx={{
            padding: "5px 15px",
            color: "#fff",
            backgroundColor: color,
            textTransform: "none",
            border: `2px solid ${borderColor}`,
            borderRadius: "30px",
          }}
        >
          {params.value}
        </Button>
      );
    },
  },

  {
    field: "type",
    headerName: "Transaction Type",
    width: 160,
  },
];

export const Status = () => {
  return (
    <Paper>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#F9F5FF",
          borderBottom: "2px solid #ccc",
        }}
      >
        <Typography variant="h5">Recent Transactions</Typography>
      </Box>

      <Box sx={{ height: 400, width: { xs: "100%", md: "100%" } }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        ></DataGrid>
      </Box>
    </Paper>
  );
};
