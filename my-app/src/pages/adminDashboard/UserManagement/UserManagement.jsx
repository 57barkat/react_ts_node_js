import React, { useState, useEffect } from "react";
import {
  getUsers,
  deleteUser,
  updateUserRole,
  updateUserDetails,
} from "../../../apis/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Grid,
  Box,
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleUpdateDetails = async (userId) => {
    try {
      await updateUserDetails(userId, userDetails);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const openDialog = (content, user) => {
    setDialogContent(content);
    setSelectedUser(user);
    setUserDetails({ name: user.name, email: user.email });
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedUser(null);
  };

  const confirmAction = () => {
    if (dialogContent.action === "delete") {
      handleDelete(selectedUser._id);
    } else if (dialogContent.action === "updateRole") {
      handleUpdateRole(selectedUser._id, dialogContent.role);
    } else if (dialogContent.action === "updateDetails") {
      handleUpdateDetails(selectedUser._id);
    }
    closeDialog();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>User Management</h1>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onChange={(e) =>
                        openDialog(
                          { action: "updateRole", role: e.target.value },
                          user
                        )
                      }
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => openDialog({ action: "delete" }, user)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          openDialog({ action: "updateDetails" }, user)
                        }
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog open={showDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          {dialogContent.action === "updateDetails" ? (
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
            >
              <TextField
                label="Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                fullWidth
              />
            </Box>
          ) : (
            <DialogContentText>
              Are you sure you want to {dialogContent.action}{" "}
              {selectedUser?.name}?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserManagement;
