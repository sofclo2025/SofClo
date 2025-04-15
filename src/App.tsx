import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Lazy load components
const Login = lazy(() => import('./pages/Login'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const OrganizationSetup = lazy(() => import('./pages/OrganizationSetup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardForm = lazy(() => import('./pages/DashboardForm'));
const StakeholderManagement = lazy(() => import('./pages/StakeholderManagement'));
const SamProgramScope = lazy(() => import('./pages/SamProgramScope'));

// Loading fallback component
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

// Route configuration
const routes = [
  {
    path: '/',
    element: <LandingPage />,
    public: true
  },
  {
    path: '/login',
    element: <Login />,
    public: true
  },
  {
    path: '/organization-setup',
    element: <OrganizationSetup />,
    public: true
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/variables/form',
    element: <DashboardForm />,
    protected: true
  },
  {
    path: '/dashboard/wizard',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/scope',
    element: <SamProgramScope />,
    protected: true
  },
  {
    path: '/dashboard/planner',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/organization',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/stakeholders',
    element: <StakeholderManagement />,
    protected: true
  },
  {
    path: '/dashboard/reports',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/risk',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/connectors',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/graphics',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/dashboard/exports',
    element: <Dashboard />,
    protected: true
  }
];

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Map routes configuration */}
              {routes.map(({ path, element, public: isPublic, protected: isProtected }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>
                        <Layout>{element}</Layout>
                      </ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              ))}

              {/* Catch all route for 404 */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
