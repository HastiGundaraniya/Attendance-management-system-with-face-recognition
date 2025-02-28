import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogout } from '../hooks/useLogut';
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"

const ProfDashboard = () => {
    const { logout } = useLogout();

    const handleLogout = (e) => {
        logout()
    }
    return (
        <div className="container-fluid">
            <div className="row content">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <div className="col-sm-10">
                    <div className="nav d-flex justify-content-between">
                        <div>
                            <h4>Dashboard</h4>
                            <p>Hello Admin</p>
                        </div>
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
                    </div>

                    {/* Stats Section */}
                    <div className="row text-center">
                        <div className="col-sm-3 ">
                            <div className="well ">
                                <h4>Add Signups</h4>
                                <Link to="/signup"><button className="btn btn-primary">View</button></Link>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="well">
                                <h4>Add Attendance</h4>
                                <Link to="/addAttendance"><button className="btn btn-primary">View</button></Link>
                            </div>
                        </div>
                        {/* <div className="col-sm-3">
                            <div className="well">
                                <h4>Monthly Attendance Report</h4>
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="well">
                                <h4>Student's Objections</h4>
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div> */}
                    </div>

                    {/* Additional Sections */}
                    {/* <div className="row">
                        <TextBox />
                        <TextBox />
                        <TextBox />
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="well">
                                <p>Text</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="well">
                                <p>Text</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};




// Text Box Component
// const TextBox = () => {
//     return (
//         <div className="col-sm-4">
//             <div className="well">
//                 <p>Text</p>
//                 <p>Text</p>
//                 <p>Text</p>
//             </div>
//         </div>
//     );
// };

export default ProfDashboard;
