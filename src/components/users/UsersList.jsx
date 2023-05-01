import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack, Typography, Button, Chip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import _ from "lodash";
import UserForm from "./UserForm";
import Popup from "../Popup";
import EditForm from "./EditForm";

export default function UsersList() {
  const [openPopup, setOpenPopup] = useState(false);
  const [users, setUsers] = useState(userData);
  const [singleUser, setSingleUser] = useState("");

  useEffect(() => {
    setUsers(users);
  }, users);

  const handleEditClicked = (user) => {
    setOpenPopup(true);
    setSingleUser(user);
    console.log("US", user);
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Users
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenPopup(true)}
          startIcon={<PersonAddAltIcon />}
        >
          Create User
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ "*": { fontWeight: 700 } }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Academic Year</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstname}
                </TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.academic_year}</TableCell>

                <TableCell>
                  {user.roles &&
                    user.roles.map((role) => (
                      <span key={role.id}>{_.capitalize(role.role_name)}</span>
                    ))}
                </TableCell>
                <TableCell>
                  {user.isActive == "Yes" ? (
                    <Chip
                      label="Active"
                      color="success"
                      size="small"
                      sx={{ minWidth: "94px" }}
                    />
                  ) : (
                    <Chip
                      label="Deactive"
                      color="warning"
                      size="small"
                      sx={{ minWidth: "94px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Stack direction="row">
                    <Button
                      // onClick={() => setOpenPopup(true)}
                      variant="secondary"
                      sx={{ minWidth: "10px" }}
                    >
                      <VisibilityOutlinedIcon
                        color="action"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Button>
                    <Button
                      onClick={() => handleEditClicked(user)}
                      variant="secondary"
                      sx={{ minWidth: "10px" }}
                    >
                      <EditOutlinedIcon
                        color="warning"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Button>
                    <Button
                      // onClick={() => setOpenPopup(false)}
                      variant="secondary"
                      sx={{ minWidth: "10px" }}
                    >
                      <DeleteOutlineIcon
                        color="error"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setSingleUser={setSingleUser}
        title={
          singleUser ? "Update User Information" : "Enter User Information"
        }
      >
        {singleUser ? (
          <EditForm
            user={singleUser}
            users={users}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            singleUser={singleUser}
            setSingleUser={setSingleUser}
          />
        ) : (
          <UserForm
            users={users}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />
        )}
      </Popup>
    </>
  );
}

const userData = [
  {
    id: 1,
    firstname: "test",
    lastname: "last2",
    email: "eeea@test.com",
    password: "$2b$08$kqry/7c0WXybF7GngrFR..xT1V9tD459R0UppjhJ6FZ8YBniGXZIW",
    academic_year: 2,
    isActive: "Yes",
    createdAt: "2023-04-14T20:09:00.294Z",
    updatedAt: "2023-04-18T18:21:31.666Z",
    roles: [
      {
        id: 2,
        role_name: "admin",
        createdAt: "2023-04-14T20:08:19.924Z",
        updatedAt: "2023-04-14T20:08:19.924Z",
        user_roles: {
          createdAt: "2023-04-14T20:09:00.417Z",
          updatedAt: "2023-04-14T20:09:00.417Z",
          role_id: 2,
          user_id: 1,
        },
      },
    ],
    courses: [],
  },
  {
    id: 2,
    firstname: "test",
    lastname: "last2",
    email: "eee@test.com",
    password: "$2b$08$7hnfcXY6dqfIcRR7mKP2iObzM.cT4mkaA87ED76Wk4eWmgfvpkUrO",
    academic_year: 1,
    isActive: "No",
    createdAt: "2023-04-14T20:13:00.774Z",
    updatedAt: "2023-04-18T17:10:46.520Z",
    roles: [
      {
        id: 1,
        role_name: "student",
        createdAt: "2023-04-14T20:08:19.923Z",
        updatedAt: "2023-04-14T20:08:19.923Z",
        user_roles: {
          createdAt: "2023-04-14T20:13:00.824Z",
          updatedAt: "2023-04-14T20:13:00.824Z",
          role_id: 1,
          user_id: 2,
        },
      },
    ],
    courses: [
      {
        id: 2,
        course_name: "C++",
        course_code: "43",
        course_year: 3,
        createdAt: "2023-04-14T20:10:30.005Z",
        updatedAt: "2023-04-14T20:10:30.005Z",
        course_users: {
          createdAt: "2023-04-14T20:13:00.827Z",
          updatedAt: "2023-04-14T20:13:00.827Z",
          course_id: 2,
          user_id: 2,
        },
      },
    ],
  },
  {
    id: 3,
    firstname: "uuu",
    lastname: "iiii",
    email: "kkk@test.com",
    password: "nnnnmmmm",
    academic_year: 1,
    isActive: "Yes",
    createdAt: "2023-04-14T20:46:40.739Z",
    updatedAt: "2023-04-14T20:46:40.739Z",
    roles: [
      {
        id: 2,
        role_name: "admin",
        createdAt: "2023-04-14T20:08:19.924Z",
        updatedAt: "2023-04-14T20:08:19.924Z",
        user_roles: {
          createdAt: "2023-04-14T20:46:40.790Z",
          updatedAt: "2023-04-14T20:46:40.790Z",
          role_id: 2,
          user_id: 3,
        },
      },
    ],
    courses: [
      {
        id: 1,
        course_name: "Java",
        course_code: "jjjj",
        course_year: 3,
        createdAt: "2023-04-14T20:10:22.684Z",
        updatedAt: "2023-04-25T09:22:48.511Z",
        course_users: {
          createdAt: "2023-04-14T20:46:40.797Z",
          updatedAt: "2023-04-14T20:46:40.797Z",
          course_id: 1,
          user_id: 3,
        },
      },
    ],
  },
  {
    id: 6,
    firstname: "uuu",
    lastname: "iiii",
    email: "ewewe@test.com",
    password: "$2b$08$w/ul75WSC11HsG197jhPmeb/lmK/uLeL1hBrIGzKBlvKjR9R56x8K",
    academic_year: 1,
    isActive: "No",
    createdAt: "2023-04-18T12:08:24.322Z",
    updatedAt: "2023-04-18T12:08:24.322Z",
    roles: [],
    courses: [],
  },
  {
    id: 7,
    firstname: "test",
    lastname: "last2",
    email: "erere@test.com",
    password: "$2b$08$wR8uvPK69WM0gjMsCy5xeuLxxYC/H6n12xMLupImW/Yy0n.D8TQWO",
    academic_year: 1,
    isActive: "Yes",
    createdAt: "2023-04-18T14:17:36.495Z",
    updatedAt: "2023-04-18T14:17:36.495Z",
    roles: [],
    courses: [],
  },
  {
    id: 5,
    firstname: "uuu",
    lastname: "iiii",
    email: "cxc@test.com",
    password: "wwwwwqe",
    academic_year: 1,
    isActive: "No",
    createdAt: "2023-04-18T12:05:53.731Z",
    updatedAt: "2023-04-18T12:05:53.731Z",
    roles: [],
    courses: [],
  },
  {
    id: 4,
    firstname: "uuu",
    lastname: "iiii",
    email: "hh@test.com",
    password: "nnnnnnnnn",
    academic_year: 1,
    isActive: "Yes",
    createdAt: "2023-04-18T12:02:20.672Z",
    updatedAt: "2023-04-18T12:02:20.672Z",
    roles: [],
    courses: [],
  },
];
