import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExpedientesList from "./pages/ExpedientesList.jsx";
import ExpedienteForm from "./pages/ExpedienteForm.jsx";
import ExpedienteDetalle from "./pages/ExpedienteDetalle.jsx";
import Reportes from "./pages/Reportes.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<ExpedientesList />} />
        <Route path="expedientes/nuevo" element={<ExpedienteForm />} />
        <Route path="expedientes/:id" element={<ExpedienteDetalle />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>
  );
};

export default App;
