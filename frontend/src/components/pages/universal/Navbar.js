import { Link } from "react-router-dom";
import Logo from '../../../images/logo.jpg'
import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";

function Navbar() {
    const {user, handleLogout} = useContext(AuthContext)
    return ( 
        <div>
            <nav style={{color:"white"}} className="navbar fixed-top p-2 navbar-expand-md bg-secondary text-dark">
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
                                <Link className="nav-link text-white Link" to="/api/post">Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white Link" to="/api/user">User</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white Link" to="api/about">About</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            {
                                user.email ? 

                                <>
                                    <li className="nav-item">
                                            <div className="dropdown nav-link">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle" 
                                                    type="button" id="dropdownMenuButton" 
                                                    data-bs-toggle="dropdown" 
                                                    aria-haspopup="true" 
                                                    aria-expanded="false"
                                                >
                                                    <img className="image-nav" src={user.image} alt="Image"/>
                                                </button>

                                                <div class="dropdown-menu dropdown-nav" aria-labelledby="dropdownMenuButton">
                                                    <li class="dropdown-item">{user.fullname}</li>
                                                    <li class="dropdown-item">{user.email}</li><hr/>
                                                    <p onClick={()=>handleLogout()} class="dropdown-item">Logout</p>
                                                </div>

                                            </div>

                                    </li>
                                </>
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