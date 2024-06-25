function Navbar() {
    return ( 
        <div>
            <nav style={{color:"white"}} class="navbar p-3 navbar-expand-md bg-secondary text-dark">
                <div class="container">
                    <a class="navbar-brand" href="#">APIs Development</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Posts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">User</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#">Authentication</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Navbar;