import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useParams,Outlet } from "react-router-dom";
import HeaderCont from "../HeaderCont";
import Footer from "../Footer";
import Manager from "./Manager";
import AddEmpl from "./AddEmpl";
import AssignTask from "./AssignTask";
export default function ManagerMainComp() {
  const { userID } = useParams();
  // BK to fetch name using Id
  const name = "Alice";
  return (
    <div>
   
        <HeaderCont name={name}/>
        
        <Outlet/>
        <Footer />
   
    </div>
  );
}
