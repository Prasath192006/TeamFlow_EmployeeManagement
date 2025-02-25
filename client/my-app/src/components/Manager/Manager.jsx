import React, { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import HeaderCont from "../HeaderCont.jsx";
import Footer from "../Footer.jsx";
import { Tempdata } from "../../App.jsx";
import {
  Avatar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import sam1 from "../../images/sample.jpg";

export default function Manager() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageEMP, setPageEMP] = useState(0);
  const [rowsPerPageEMP, setRowsPerPageEMP] = useState(5);
  const navigate = useNavigate();
  const  {userID} = useParams();

  
  const userData = Tempdata.find((id) => id.userid === userID);
  if (!userData) {
    console.log(userID,"sds")
    return <Typography>User not found.</Typography>;
  }
  const [completedTasks, setCompletedTasks] = useState(
    Tempdata.filter(
      (empl) => empl.TaskStatus === "Completed" && empl.task !== "nil"
    )
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePageEMP = (event, newPage) => setPageEMP(newPage);
  const handleChangeRowsPerPageEMP = (event) => {
    setRowsPerPageEMP(parseInt(event.target.value, 10));
    setPageEMP(0);
  };

  const verifyBtn = (currUser) => {
    setCompletedTasks((prevTasks) =>
      prevTasks
        .map((empl) =>
          empl.userid === currUser.userid ? { ...empl, task: "nil" } : empl
        )
        .filter((empl) => empl.task !== "nil")
    );
  };

  return (
    <Box
      sx={{
        fontFamily: "Roboto, sans-serif",
        bgcolor: "#01123eeb",
        color: "aliceblue",
        minHeight: "100vh",
        pb:"10rem",
        mb: "-2rem",
      }}
      >
     

      <Grid
        container
        spacing={2}
        sx={{ p: { xs: 2, md: 4 }, mt:0 , border: "1px solid white" }}
      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="img"
            src={sam1}
            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">
            {userData.name.toUpperCase()}
          </Typography>
          <Typography variant="h6">Role: Manager</Typography>
          <Typography variant="h6">ID: TF27M234</Typography>
          <Typography variant="h6" sx={{ wordWrap: "break-word" }}>
            Address: Karpagam college of engineering, Othakalmandapam,
            Coimbatore, Tamil Nadu
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5,mt:5  }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("AddEmployee")}
            >
              ADD EMPLOYEE
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("AssignTask")}
            >
              Assign Task
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{ my: { xs: 3, md: 5 }, fontFamily: '"Sansita", serif' }}
      >
        Task Verification
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", mx: "auto", mb: 4, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Sno", "Name", "Task", "Assigned ON","Completed Time", "Check"].map(
                (head) => (
                  <TableCell
                    key={head}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      fontSize: { xs: "10px", md: "14px" },
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((empl, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{empl.name}</TableCell>
                  <TableCell align="center">{empl.task}</TableCell>
                  <TableCell align="center">{empl.assignedON}</TableCell>
                  <TableCell align="center">{empl.workCompletedTime}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="success" fullWidth onClick={()=>navigate("CheckTask")}>
                      CHECK
                    </Button>
                  </TableCell>
                  {/* <TableCell align="center">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => verifyBtn(empl)}
                    >
                      VERIFIED
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={completedTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Typography
        variant="h4"
        textAlign="center"
        sx={{ my: { xs: 3, md: 7 }, fontFamily: '"Sansita", serif' }}
      >
        Employee Status
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", mx: "auto", mb: 4, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sno",
                "Name",
                "Role",
                "Current Task",
                "Due Date",
                "Status",
              ].map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: { xs: "10px", md: "14px" },
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Tempdata.slice(
              pageEMP * rowsPerPageEMP,
              pageEMP * rowsPerPageEMP + rowsPerPageEMP
            ).map((empl, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {pageEMP * rowsPerPageEMP + index + 1}
                </TableCell>
                <TableCell align="center">{empl.name}</TableCell>
                <TableCell align="center">{empl.role}</TableCell>
                <TableCell align="center">{empl.task}</TableCell>
                <TableCell align="center">
                  {dayjs(empl.dueDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: empl.emplyStatus === "Active" ? "green" : "red",
                  }}
                >
                  {empl.emplyStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={Tempdata.length}
          rowsPerPage={rowsPerPageEMP}
          page={pageEMP}
          onPageChange={handleChangePageEMP}
          onRowsPerPageChange={handleChangeRowsPerPageEMP}
         />
      </TableContainer>

     
    </Box>
  );
}
