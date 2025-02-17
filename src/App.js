import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Inventory from './pages/Inventory';
import Compliance from './pages/Compliance';
import FinOps from './pages/FinOps';
import LandingPage from './pages/LandingPage';

function ProtectedRoute({ children }) {
  // Mock authentication - replace with actual auth check
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/" />;
}

function DashboardLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Tasks />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Inventory />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Compliance />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/finops"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <FinOps />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
