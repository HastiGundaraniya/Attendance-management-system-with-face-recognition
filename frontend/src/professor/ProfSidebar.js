import { Link, useLocation } from "react-router-dom";

const ProfSidebar = () => {
    const location = useLocation(); // Get current path

    return (
        <div className="col-sm-2 sidenav hidden-xs">
            <h2>Professor Dashboard</h2>
            <hr />
            <ul className="nav-pills nav-stacked flex-column">
                <li className={location.pathname === "/professor" ? "active" : ""}>
                    <Link to="/professor">Today's Attendance</Link>
                </li>
                <li className={location.pathname === "/week" ? "active" : ""}>
                    <Link to="/week">Weekly Attendance Report</Link>
                </li>
                <li>
                    <Link to="/allSReport">Student Attendance Report</Link>
                </li>
                <li>
                    <Link to="/pdashboard">Student's Objections</Link>
                </li>
                <li>
                    <Link to="/pChangePass">Change Password</Link>
                </li>
            </ul>
            <br />
        </div>
    );
}

export default ProfSidebar;
