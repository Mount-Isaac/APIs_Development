function Navbar() {
    return ( 
        <div>
            <nav style={{color:"white"}} className="navbar fixed-top p-4 navbar-expand-md bg-secondary text-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">APIs Development</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Posts</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">User</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Authentication</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Navbar;