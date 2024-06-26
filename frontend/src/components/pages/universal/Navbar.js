import { Link } from "react-router-dom";
import Logo from '../../../images/logo.jpg'
import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";

function Navbar() {
    const {user} = useContext(AuthContext)
    return ( 
        <div>
            <nav style={{color:"white"}} className="navbar fixed-top p-4 navbar-expand-md bg-secondary text-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="image-logo" src={Logo} alt="APIs Development"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-white active Link" aria-current="page" to="/">{user.email ? "Dashboard" : "Home"}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white Link" to="/posts">Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white Link" to="/user">User</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">About</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            {
                                user.email ? 

                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/api/auth/login">{user.fullname}</Link>
                                    </li>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/api/auth/login">Login</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/api/auth/register">Register</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Navbar;