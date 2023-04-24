import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TabletLayout from "./components/layouts";
import AllClientsPage from "./pages/AllClients";
import ClientsPage from "./pages/Clientes";
import ReportPage from "./pages/ReportPage";
import { AppContainer } from "./styles/app.styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PendingReportPage from "./pages/PendingReport";
import CreatelaudofinalPage from "./pages/CreateLaudoFinal";
import SignIn from "./components/Sign-In";
import { SignInLayout } from "./components/layouts/signIn";
import isAuthenticated from "./hooks/isAuthenticated";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <SignInLayout>
              <SignIn />
            </SignInLayout>
          }
        />
        <Route
          path="/*"
          element={
            <TabletLayout>
              <PrivateRoute>
                <Routes>
                  <Route path="/clients" element={<ClientsPage/>} />
                  <Route path="/allclients" element={<AllClientsPage />} />
                  <Route path="/createreport" element={<ReportPage />} />
                  <Route
                    path="/pendingreport"
                    element={<PendingReportPage />}
                  />
                  <Route
                    path="/createlaudofinal"
                    element={<CreatelaudofinalPage />}
                  />
                  <Route index element={<Navigate to="/allclients" />} />
                </Routes>
              </PrivateRoute>
            </TabletLayout>
          }
        />
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};


export default App;
