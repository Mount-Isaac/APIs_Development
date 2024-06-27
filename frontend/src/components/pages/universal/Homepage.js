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
                        <li><Link className="Link" to="/api/post">Post Endpoints</Link>
                            <div className="my-3 px-3 text-left">
                                <p style={{marginBottom:0}}>Our Post will simulate all the features in 
                                    <span className="text-primary mx-1">X</span>formerly 
                                    <span className="text-info mx-1">Twitter</span> when a post is created.
                                </p>

                                <pre className="pt-2 text-success">Create, update, delete, like, unlike, follow, unfollow, comment, and bookmark a post</pre>
                                <p>Besides these, one will be able to read all published posts tied to the above actions however, 
                                    limited depending if you're the owner of a post or not.
                                </p>
                            </div>
                        </li>

                        <li><Link className="Link" to="/api/user"> User Endpoints</Link>
                            <div className="my-3 px-3 text-left">
                                <p style={{marginBottom:0}}>Besides creating a user, other user associated endpoints are</p>

                                <pre className="pt-2 text-success">Update, delete, change password, change email, add a new email, newletter subscription</pre>
                            </div>
                        </li>
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
