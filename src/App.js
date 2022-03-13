import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/Admin";

// routes
import { RequireAuth, RestrictLoggedInUser } from "./HOCs/routes";

// authentication pages
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";

// projects
import ManageProjects from "./views/Admin/Projects/Manage";
import NewProject from "./views/Admin/Projects/New";
import EditProject from "./views/Admin/Projects/Edit";
import ProjectMembers from "./views/Admin/Projects/Member";

// tasks
import ManageTasks from "./views/Admin/Tasks/Manage";

// users
import ManageUsers from "./views/Admin/Users/Manage";
import NewUser from "./views/Admin/Users/New";

// my profile
import MyProfile from "./views/Admin/MyProfile";

// errors
import PageNotFound from "./views/Errors/404";

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

        <Route element={<AdminLayout />}>
          <Route
            path="/projects"
            element={
              <RequireAuth redirectPath="/sign-in">
                <ManageProjects />
              </RequireAuth>
            }
          />

          <Route
            path="/projects/new"
            element={
              <RequireAuth redirectPath="/sign-in">
                <NewProject />
              </RequireAuth>
            }
          />

          <Route
            path="/projects/:projectId/edit"
            element={
              <RequireAuth redirectPath="/sign-in">
                <EditProject />
              </RequireAuth>
            }
          />

          <Route
            path="/projects/:projectId/members"
            element={
              <RequireAuth redirectPath="/sign-in">
                <ProjectMembers />
              </RequireAuth>
            }
          />

          <Route
            path="/projects/:projectId/board"
            element={
              <RequireAuth redirectPath="/sign-in">
                <ManageTasks />
              </RequireAuth>
            }
          />

          <Route
            path="/users"
            element={
              <RequireAuth redirectPath="/sign-in">
                <ManageUsers />
              </RequireAuth>
            }
          />

          <Route
            path="/users/new"
            element={
              <RequireAuth redirectPath="/sign-in">
                <NewUser />
              </RequireAuth>
            }
          />

          <Route
            path="/my-profile"
            element={
              <RequireAuth redirectPath="/sign-in">
                <MyProfile />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
