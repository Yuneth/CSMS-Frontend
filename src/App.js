import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookingForm from './pages/BookingForm';
import { getToken } from './utils/auth';
import ServiceForm from './pages/ServiceForm';

// Reusable route protector
const PrivateRoute = ({ element }) => {
  return getToken() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/booking-form" element={<PrivateRoute element={<BookingForm />} />} />
        <Route path="/service-form" element={<PrivateRoute element={<ServiceForm/>} />} />
        <Route path="/booking-form/:id" element={<PrivateRoute element={<BookingForm />} />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
