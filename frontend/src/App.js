import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home';
import StuHome from './student/StuHome';
import ProfHome from './professor/ProfHome';
import WeekDates from './professor/WeekDates';
import Email from './pages/Email';
import ResetPassword from './pages/ResetPassword';
import ProfDashboard from './professor/ProfDashboard';
import StuDashboard from './student/StuDashboard'
import TotalAttendance from './student/TotalAttendance';
import AttendanceReport from './professor/AttendanceReport';
import ProfChangePass from './professor/ProfChangePass';
import StuChangePass from './student/StuChangePass'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={
              user ? (user.authLevel === 'student' ? <StuHome /> : <ProfDashboard />) : <Home />
            }
          />
          <Route path='/pdashboard' element={user ? <ProfDashboard /> : <Home />} />
          <Route path='/sdashboard' element={user ? <StuDashboard /> : <Home />} />
          <Route path="/student" element={user ? <StuHome /> : <Home />} />
          <Route path="/professor" element={user ? <ProfHome /> : <Home />} />
          <Route path='/week' element={user ? <WeekDates/> : <Home />} />
          <Route path='/allSReport' element={user ? <AttendanceReport /> : <Home />} />
          <Route path='/pChangePass' element={user ? <ProfChangePass /> : <Home />} />
          <Route path='/studentrecord' element={user ? <TotalAttendance/> : <Home />} />
          <Route path='/sChangePass' element={user ? <StuChangePass /> : <Home />} />
          <Route path='/email' element={<Email/>} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
