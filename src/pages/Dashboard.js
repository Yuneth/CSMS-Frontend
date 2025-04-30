import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking, updateBooking, createBooking } from "../services/bookingService";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";
import { DataGrid } from "@mui/x-data-grid";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const user = getUserFromToken();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState(null);

  useEffect(() => {
    if (userData?.id) {
      fetchBookings(userData.id);
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await getBookings(userId);
      const formattedData = response.data.map((item) => ({
        id: item.id,
        customerName: item.customerName,
        address: item.address,
        dateTime: item.dateTime,
        serviceName:item.serviceName,
        username:item.username,
      }));
      setBookings(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    const updatedRow = bookings.find((b) => b.id === id);
    if (!updatedRow) return;
  
    try {
      await updateBooking(id, updatedRow);
      alert("Booking updated successfully!");
      fetchBookings(user.userId);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update booking.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
        window.location.reload();
        fetchBookings(user.userId);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleConfirmSave = async () => {
    const payload = {
      customerName: dialogData.customerName,
      address: dialogData.address,
      dateTime: dialogData.dateTime,
      serviceName: dialogData.serviceName,
      username: dialogData.username,
      userId: user.userId, // required!
    };
  
    try {
      await createBooking(payload);
      alert("Booking created!");
      fetchBookings(user.userId);
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to save booking:", error);
      alert("Failed to save booking");
    }
  };
  

  const handleAddRow = () => {
    const newId = Date.now(); 
    const newRow = {
      id: newId,
      customerName: "",
      address: "",
      dateTime: "",
      serviceName:"",
      username:"",
      isNew: true,
    };
    setBookings((prev) => [newRow, ...prev]);
    setEditingRowId(newId);
  };

  const columns = [
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
    },
    {
      field: "dateTime",
      headerName: "Date & Time",
      flex: 1,
      editable: true,
    },
    {
      field: "serviceName",
      headerName: "Service Name",
      flex: 1,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const isNew = params.row.isNew;

        return isNew ? (
          <Button
  variant="contained"
  color="success"
  size="small"
  onClick={() => {
    const row = bookings.find((b) => b.id === params.row.id);
    if (!row.customerName || !row.address || !row.dateTime || !row.serviceName || !row.username) {
      alert("All fields are required.");
      return;
    }
    setDialogData(row);
    setOpenDialog(true);
  }}
>
  Save
</Button>
        ) : (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEdit(params.row.id)}
                color="primary"
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDelete(params.row.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome to{" "}
          <Box component="span" sx={{ color: "secondary.main" }}>
            {userData?.userName}
          </Box>
          's Dashboard
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddRow}>
          Add Booking
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Card>
        <CardContent>
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={bookings}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              editMode="cell"
              processRowUpdate={(updatedRow) => {
                const updated = bookings.map((row) =>
                  row.id === updatedRow.id ? updatedRow : row
                );
                setBookings(updated);
                return updatedRow;
              }}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Confirm Booking</DialogTitle>
  <DialogContent dividers>
    <Typography variant="body1">
      Are you sure you want to save this booking with the following details?
    </Typography>
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Customer Name"
        value={dialogData?.customerName || ""}
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Address"
        value={dialogData?.address || ""}
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Date & Time"
        value={dialogData?.dateTime || ""}
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Service Name"
        value={dialogData?.serviceName || ""}
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Username"
        value={dialogData?.username || ""}
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true }}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleConfirmSave}
    >
      Confirm Save
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
}

export default Dashboard;
