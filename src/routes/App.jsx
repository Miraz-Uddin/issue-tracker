import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Layouts from "../components/Layouts";
import About from "../pages/About";
import Home from "../pages/Home";
import AddIssue from "../pages/Issue/AddIssue";
import EditIssue from "../pages/Issue/EditIssue";
import Issues from "../pages/Issue/Issues";
import ViewIssue from "../pages/Issue/ViewIssue";
import NotFound from "../pages/NotFound";
import AuthRequired from "./PrivateRouteGuard";
import PublicRoute from "./PublicRouteGurad";

function App() {
  const [totalIssueCount, setTotalIssueCount] = useState(1);
  const [newIssueCount, setNewIssueCount] = useState(1);
  const [completedIssueCount, setCompletedIssueCount] = useState(0);
  const [inProgressIssueCount, setInProgressIssueCount] = useState(0);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <BrowserRouter>
        <Layouts />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/issues"
            element={
              <AuthRequired>
                <Issues />
              </AuthRequired>
            }
          />
          <Route
            path="issues/create"
            element={
              <AuthRequired>
                <AddIssue />
              </AuthRequired>
            }
          />
          <Route
            path="issues/edit/:id"
            element={
              <AuthRequired>
                <EditIssue />
              </AuthRequired>
            }
          />
          <Route
            path="issues/view/:id"
            element={
              <AuthRequired>
                <ViewIssue />
              </AuthRequired>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
