import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navMenu = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/courses-upload">Courses Upload</Link></li>
        <li><Link to="/assignment">Assignment Upload</Link></li>
        <li><Link to="/assignment-question">Assignment</Link></li>
        <li><Link to="/register">Register</Link></li>
    </>
    const handleLogout = () =>{
        logOut()
        .then(()=>{})
    }
    return (
        <div className="bg-base-200">
            <div className="navbar w-10/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navMenu}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">CourseHub</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenu}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/login" className="btn">Login</Link>
                </div>
                {
                    user &&
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                {user?.displayName}
                                
                            </a>
                        </li>
                        <li><Link to="/myCourses">My Courses</Link></li>
                        <li><Link to="/myEnrolled">My Enroll courses</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
                }
            </div>
        </div>
    );
};

export default Navbar;