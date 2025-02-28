import { Link, useLocation } from "react-router-dom";

const StuSidebar = () => {
    const location = useLocation(); // Get current path

    return (
        <div className="col-sm-2 sidenav hidden-xs">
            <h2> Admin Dashboard </h2>
            <hr />
            <ul className="nav-pills nav-stacked flex-column">
                <li className={location.pathname === "/signup" ? "active" : ""}>
                    <Link to="/signup">Add Signups</Link>
                </li>
                <li className={location.pathname === "/addAttendance" ? "active" : ""}>
                    <Link to="/addAttendance">Add Attendance</Link>
                </li>
                {/* <li className={location.pathname === "/pdashboard" ? "active" : ""}>
                    <Link to="/sdashboard">Request Objection</Link>
                </li>
                <li>
                    <Link to="/sdashboard">Change Password</Link>
                </li> */}
            </ul>
            <br />
        </div>
    );
}

export default StuSidebar;
