import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import theme from './theme';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout.js';

// Lazy load components
const Login = lazy(() => import('./pages/Login'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const OrganizationSetup = lazy(() => import('./pages/OrganizationSetup'));
const DashboardForm = lazy(() => import('./pages/DashboardForm'));
const SamProgramScope = lazy(() => import('./pages/SamProgramScope'));
const PlannerDashboard = lazy(() => import('./pages/dashboard/planner'));
const OverviewDashboard = lazy(() => import('./pages/dashboard/Overview'));
const OperatingModelLanding = lazy(() => import('./pages/dashboard/OperatingModelLanding'));
const OperatingModel = lazy(() => import('./pages/OperatingModel'));
const SoftwareTierMatrix = lazy(() => import('./pages/dashboard/SoftwareTierMatrix'));
const ToolingDiagram = lazy(() => import('./pages/dashboard/ToolingDiagram'));

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
    element: <OverviewDashboard />,
    protected: true
  },
  {
    path: '/dashboard/wizard',
    element: <DashboardForm />,
    protected: true
  },
  {
    path: '/dashboard/samprogramscope',
    element: <SamProgramScope />,
    protected: true
  },
  {
    path: '/dashboard/operating-model',
    element: <OperatingModelLanding />,
    protected: true
  },
  {
    path: '/dashboard/operating-model/team',
    element: <OperatingModel />,
    protected: true
  },
  {
    path: '/dashboard/operating-model/tier-matrix',
    element: <SoftwareTierMatrix />,
    protected: true
  },
  {
    path: '/dashboard/planner',
    element: <PlannerDashboard />,
    protected: true
  },
  {
    path: '/dashboard/tooling-diagram',
    element: <ToolingDiagram />,
    protected: true
  }
];

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
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
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
