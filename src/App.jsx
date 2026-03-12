
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ConfirmSignupPage from './pages/ConfirmSignupPage';
import DashboardPage from './pages/DashboardPage';

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

          {/* Protected Routes with Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout><DashboardPage /></Layout>} path="/dashboard" />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
