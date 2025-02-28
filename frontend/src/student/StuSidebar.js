import { Link, useLocation } from "react-router-dom";

const StuSidebar = () => {
    const location = useLocation(); // Get current path

    return (
        <div className="col-sm-2 sidenav hidden-xs">
            <h2> Student Dashboard </h2>
            <hr />
            <ul className="nav-pills nav-stacked flex-column">
                <li className={location.pathname === "/student" ? "active" : ""}>
                    <Link to="/student">Today's Attendance</Link>
                </li>
                <li className={location.pathname === "/record" ? "active" : ""}>
                    <Link to="/studentrecord">Attendance Report</Link>
                </li>
                <li className={location.pathname === "/pdashboard" ? "active" : ""}>
                    <Link to="/sdashboard">Request Objection</Link>
                </li>
                <li>
                    <Link to="/sChangePass">Change Password</Link>
                </li>
            </ul>
            <br />
        </div>
    );
}

export default StuSidebar;
