import { BrowserRouter , Routes, Route } from 'react-router-dom';
import AddSignup from './pages/AddSignup';
import AddAttendance from './pages/AddAttendance';
import AdminLoginPage from './pages/AdminLoginPage';
import { useAuthContext } from './hooks/useAuthContext';
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <AdminDashboard /> : <AdminLoginPage />  } />
          <Route path="/adashboard" element={user ? <AdminDashboard /> : <AdminLoginPage />  } />
          <Route path="/signup" element={user ? <AddSignup /> : <AdminLoginPage />} />
          <Route path="/addAttendance" element={user ? <AddAttendance /> : <AdminLoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
