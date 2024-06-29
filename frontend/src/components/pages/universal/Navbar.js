import { Link } from "react-router-dom";
import Logo from '../../../images/logo.jpg'
import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";
import React, { useState, useEffect, useRef } from 'react';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const navbarTextRef = useRef(null);

    // Function to toggle menu state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when clicking outside the button
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarTextRef.current && !navbarTextRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const {user, handleLogout} = useContext(AuthContext)
    return ( 
        <div>
            <nav style={{color:"white", backgroundColor:'#2E2E2E'}} className="navbar fixed-top p-3 navbar-expand-md text-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="image-logo" src={Logo} alt="APIs Development"/>
                    </Link>
                    <button 
                        ref={buttonRef}
                        className={`navbar-toggler bg-white ${isOpen ? 'active' : ''}`} 
                        type="button" 
                        aria-controls="navbarText" 
                        aria-expanded={isOpen ? 'true' : 'false'} 
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <span className="navbar-toggler-icon text-dark"></span>
                    </button>

                    <div ref={navbarTextRef} className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarText">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
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

                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0 text-center">
                            {
                                user.email ? 

                                <>
                                    <li className="nav-item">
                                            <div className="dropdown nav-link">
                                                <button
                                                    className="btn dropdown-toggle" 
                                                    type="button" 
                                                    id="dropdownMenuButton" 
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