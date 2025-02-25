import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import GridEg from "./components/Grid.jsx";
import LogIn from "./components/Home/LogIn.jsx";
import HeaderCont from "./components/HeaderCont.jsx";
import AddEmpl from "./components/Manager/AddEmpl.jsx";
import Footer from "./components/Footer.jsx";
import AssignTask from "./components/Manager/AssignTask.jsx";
import CheckTask from "./components/Manager/CheckTask.jsx";
import Manager from "./components/Manager/Manager.jsx";
import Employee from "./components/Employee/Employee.jsx";
import Timer from "./components/Timer.jsx";
import ManagerMainComp from "./components/Manager/ManagerMainComp.jsx";

export const Tempdata = [
  {
    name: "Devon",
    userid: "M25TF09",
    passkey: "abcd1234",
    task: "Build Figma Design",
    taskDesc:
      "Figma design should be reliable , It is build for Import/Export Company , They need to manage the prodect details",
    checkList: ["Include Product Status", "Employee Status"],
    dueDate: "2025-02-25T23:59:59",
    VerificationStatus: "Not",
    TaskStatus: "pending",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    emplyStatus: "Active",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "E25TF05",
    passkey: "abcd1234",
    task: "Build Figma Design",
    taskDesc:
      "Figma design should be reliable , It is build for Import/Export Company , They need to manage the prodect details",
    checkList: ["Include Product Status", "Employee Status"],
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "2025-02-28T23:59:59",
    emplyStatus: "Active",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "M25TF01",
    passkey: "abcd1234",
    task: "Complete CSS",
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "M25TF02",
    passkey: "abcd1234",
    task: "Update DataBase",
    VerificationStatus: "Not",
    TaskStatus: "NotCompleted",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Active",
    assignedON:"12-2-2025",
  },
  {
    name: "Charlie",
    userid: "M25TF03",
    passkey: "abcd1234",
    task: "Complete CSS",
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "M25TF04",
    passkey: "abcd1234",
    task: "Update DataBase",
    VerificationStatus: "Not",
    TaskStatus: "NotCompleted",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Zaara",
    userid: "E25TF011",
    passkey: "abcd1234",
    task: "",
    VerificationStatus: "Not",
    TaskStatus: "not",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "M25TF06",
    passkey: "abcd1234",
    task: "Complete CSS",
    VerificationStatus: "Not",
    TaskStatus: "NotCompleted",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Active",
    assignedON:"12-2-2025",
  },
  {
    name: "Alice",
    userid: "M25TF07",
    passkey: "abcd1234",
    task: "Complete CSS",
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Bob",
    userid: "M25TF08",
    passkey: "abcd1234",
    task: "Update DataBase",
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Not Available",
    assignedON:"12-2-2025",
  },
  {
    name: "Elisa",
    userid: "M25TF12",
    passkey: "abcd1234",
    task: "Complete CSS",
    VerificationStatus: "Not",
    TaskStatus: "Completed",
    workCompletedTime: "02:36 PM",
    role: "Technical Engineer",
    dueDate: "12-02-2025",
    emplyStatus: "Active",
    assignedON:"12-2-2025",
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/Manager/:userID/" element={<ManagerMainComp />}>
            <Route index  element={<Manager />} />
            <Route path="AddEmployee" element={<AddEmpl />}></Route>
            <Route path="AssignTask" element={<AssignTask />}></Route>
            <Route path="CheckTask" element={<CheckTask />}></Route>
          </Route>
          <Route path="/Employee/:userID" element={<Employee />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
