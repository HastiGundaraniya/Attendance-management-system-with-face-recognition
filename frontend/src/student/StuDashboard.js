import React from "react";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Link } from "react-router-dom";
import StuSidebar from "./StuSidebar"

const ProfDashboard = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleLogout = (e) => {
        logout()
    }
    
    return (
        <div className="container-fluid">
            <div className="row content">
                {/* Sidebar */}
                <StuSidebar />
                {/* Main Content */}
                <div className="col-sm-10">
                    <div className="nav d-flex justify-content-between">
                        <div>
                            <h4>Dashboard</h4>
                            <p>Hello {user.name}</p>
                        </div>
                        <button className="btn btn-outline-primary" onClick={handleLogout}>Log Out</button>
                    </div>

                    {/* Stats Section */}
                    <div className="row text-center ">
                        <div className="col-sm-4 ">
                            <div className="well pt-4 pb-4">
                                <h4>Today's Attendance</h4>
                                <Link to="/student"><button className="btn btn-primary">View</button></Link>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="well pt-4 pb-4">
                                <h4>Attendance Report</h4>
                                <Link to="/studentrecord"><button className="btn btn-primary">View</button></Link>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="well pt-4 pb-4">
                                <h4>Student's Objections</h4>
                                <button className="btn btn-primary">View</button>
                            </div>
                        </div>
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
