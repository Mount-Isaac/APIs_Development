import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";
import { Link } from "react-router-dom";

export default function Homepage() {
    const {user} = useContext(AuthContext)

    return ( 
        <div className="container p-3">
            <div className="text-center">
                <h1 className="text-primary">Welcome to APIs Development</h1>
                <pre style={{fontWeight:600}}>Using Django, REST API and ReactJS</pre>
            </div>

            {
                user.email ? 
                <div className="my-5">
                    <p>Navigate and interact with our endpoints from this apps</p>
                    <ul>
                        <li><Link className="Link" to="/">Social media Posts</Link></li>
                        <li><Link className="Link" to="/">User functionalities</Link></li>
                    </ul>
                </div>
                :
                <div>
                    <div>
                        <p>
                            To Leverage end use of this API endpoint, kindly login or create an account 
                        </p>

                        <p>
                            <Link to="/api/auth/login">Login</Link>
                        </p>

                        <p>
                            <Link to="/api/auth/register">Register</Link>
                        </p>
                    </div>
                </div>
            }
        </div>
     );
}
