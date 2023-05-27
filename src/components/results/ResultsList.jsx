// import * as React from "react";
// import { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Stack, Typography, Button, Chip } from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import _ from "lodash";
// import UserForm from "./UserForm";
// import EditForm from "./EditForm";
// import { useQuery } from "@tanstack/react-query";
// import BackdropLoader from "../ui/Backdrop";
// import NotificationSnackbars from "../ui/Snackbar";
// import { Link } from "react-router-dom";
// import Popup from "../ui/Popup";
// import { getResults } from "../../services/results";

// export default function ResultsList() {
//   const [openPopup, setOpenPopup] = useState(false);
//   const [result, setResult] = useState("");

//   const {
//     isLoading,
//     data: results,
//     isError,
//     error,
//   } = useQuery(["results-list"], getResults);

//   const handleEditClicked = (result) => {
//     setOpenPopup(true);
//     setResult(result);
//     console.log("RES", result);
//   };

//   const handleCreateClicked = () => {
//     setResult("");
//     setOpenPopup(true);
//   };

//   return (
//     <>
//       <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
//           Results
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={handleCreateClicked}
//           startIcon={<PersonAddAltIcon />}
//         >
//           Add Result
//         </Button>
//       </Stack>
//       <>{isLoading && <BackdropLoader />}</>
//       <>
//         {isError && (
//           <NotificationSnackbars message={error?.message} severity="error" />
//         )}
//       </>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead sx={{ "*": { fontWeight: 700 } }}>
//             <TableRow>
//               <TableCell>First Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Email Address</TableCell>
//               <TableCell>Academic Year</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users &&
//               users?.data.map((user) => (
//                 <TableRow
//                   key={user.id}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {user.firstname}
//                   </TableCell>
//                   <TableCell>{user.lastname}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.academic_year}</TableCell>

//                   <TableCell>
//                     {user.roles &&
//                       user.roles.map((role) => (
//                         <span key={role.id}>
//                           {_.capitalize(role.role_name)}
//                         </span>
//                       ))}
//                   </TableCell>
//                   <TableCell>
//                     {user.isActive == "Active" ? (
//                       <Chip
//                         label="Active"
//                         color="success"
//                         size="small"
//                         sx={{ minWidth: "94px" }}
//                       />
//                     ) : (
//                       <Chip
//                         label="Deactive"
//                         color="warning"
//                         size="small"
//                         sx={{ minWidth: "94px" }}
//                       />
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Stack direction="row">
//                       <Link to={`/users/${user.id}`}>
//                         <Button variant="secondary" sx={{ minWidth: "10px" }}>
//                           <VisibilityOutlinedIcon
//                             color="action"
//                             sx={{ fontSize: "1rem" }}
//                           />
//                         </Button>
//                       </Link>

//                       <Button
//                         onClick={() => handleEditClicked(user)}
//                         variant="secondary"
//                         sx={{ minWidth: "10px" }}
//                       >
//                         <EditOutlinedIcon
//                           color="warning"
//                           sx={{ fontSize: "1rem" }}
//                         />
//                       </Button>
//                       <Button
//                         // onClick={() => handleDetailsClicked(user)}
//                         variant="secondary"
//                         sx={{ minWidth: "10px" }}
//                       >
//                         <DeleteOutlineIcon
//                           color="error"
//                           sx={{ fontSize: "1rem" }}
//                         />
//                       </Button>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Popup
//         openPopup={openPopup}
//         setOpenPopup={setOpenPopup}
//         title={user ? "Update User Information" : "Enter User Information"}
//       >
//         {user ? (
//           <EditForm
//             user={user}
//             openPopup={openPopup}
//             setOpenPopup={setOpenPopup}
//           />
//         ) : (
//           <UserForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
//         )}
//       </Popup>
//     </>
//   );
// }

const ResultsList = () => {
  return <>Result</>;
};

export default ResultsList;
