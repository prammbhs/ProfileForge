
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ApiKeysPage from './pages/ApiKeysPage';
import CertificatesPage from './pages/CertificatesPage';
import ProjectsPage from './pages/ProjectsPage';
import ExternalProfilesPage from './pages/ExternalProfilesPage';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<Layout><LandingPage /></Layout>} path="/" />
          <Route element={<Layout><LoginPage /></Layout>} path="/login" />
          <Route element={<Layout><SignupPage /></Layout>} path="/signup" />
          <Route element={<Layout><ConfirmSignupPage /></Layout>} path="/confirm-signup" />

          {/* Protected Routes with Sidebar Layout */}
          <Route element={<DashboardLayout />} path="/dashboard">
            <Route index element={<DashboardPage />} />
            <Route element={<ProfilePage />} path="profile" />
            <Route element={<ApiKeysPage />} path="keys" />
            <Route element={<CertificatesPage />} path="certificates" />
            <Route element={<ProjectsPage />} path="projects" />
            <Route element={<ExternalProfilesPage />} path="profiles" />
            <Route element={<DashboardPage />} path="docs" />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
