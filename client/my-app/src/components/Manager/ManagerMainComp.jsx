import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams,Outlet } from "react-router-dom";
import HeaderCont from "../HeaderCont";
import Footer from "../Footer";
export default function ManagerMainComp() {
 const [triggerHistory, setTriggerHistory] = useState(0);

  // Function Sidebar will call
  const handleManagerHistoryClick = () => {
    setTriggerHistory(prev => prev + 1); // toggle
  };
  return (
    <div>
   
        {/* Pass handler to HeaderCont → Sidebar */}
      <HeaderCont onManagerHistoryClick={handleManagerHistoryClick} />

      {/*  Pass trigger as context/state to Manager */}
      <Outlet context={{ triggerHistory }} />

        <Footer />
   
    </div>
  );
}
