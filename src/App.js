import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// routes
import { RequireAuth, RestrictLoggedInUser } from "./HOCs/routes";

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

        <Route
          path="/sign-in"
          element={
            <RestrictLoggedInUser redirectPath="/projects">
              <SignIn />
            </RestrictLoggedInUser>
          }
        />
        
        <Route
          path="/sign-up"
          element={
            <RestrictLoggedInUser redirectPath="/projects">
              <SignUp />
            </RestrictLoggedInUser>
          }
        />

        <Route
          path="/projects"
          element={
            <RequireAuth redirectPath="/sign-in">
              <ManageProjects />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
