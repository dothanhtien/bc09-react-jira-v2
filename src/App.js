import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// authentication pages
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";

// projects
import ManageProjects from "./views/Admin/Projects/Manage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<ManageProjects />} />
        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
