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
                    <div className="row">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <h3>Developer's</h3>
                            {/* <p style={{marginBottom:0}}>Super Devs, Navigate and interact with our endpoints.</p>
                            <p className="text-info" style={{fontWeight:600, fontFamily:'cursive'}}><small>Open to feedback.</small></p> */}
                            <ul className="my-1">
                                <li><Link className="Link" to="/api/post">Post Endpoints</Link>
                                    <div className="my-3 px-3 text-left">
                                        <p style={{marginBottom:0}}>Our Post will simulate all the features in 
                                            <span className="text-primary mx-1">X</span>formerly 
                                            <span className="text-info mx-1">Twitter</span> when a post is created;
                                        </p>

                                        <pre className="pt-2 text-success">Create, update, delete, like, unlike</pre>
                                        <pre className="pt-0 text-success">Follow, unfollow, comment, & bookmark</pre>
                                        <p>Besides these, one will be able to read all published posts tied to the above actions</p> 
                                        <p>However, limited depending if you're the owner of a post or not.</p>
                                    </div>
                                </li>

                                <li><Link className="Link" to="/api/user"> User Endpoints</Link>
                                    <div className="my-3 px-3 text-left">
                                        <p style={{marginBottom:0}}>Besides creating a user, other user associated endpoints are:</p>

                                        <pre className="pt-2 text-success">Update, delete, change password</pre>
                                        <pre className="pt-0 text-success">change email, add a new email</pre>
                                        <pre className="pt-0 text-success">subscribe to newletter subscription</pre>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="d-none d-lg-block col-1" style={{height:600, borderLeft:'2px solid black'}}></div>
                        <div className="col-lg-4 col-md-12 col-sm-12"><vh/>
                            <h3>Users</h3>
                            <p>To interact with ours APIs from a webpage point of view, follow this link.</p>
                            <p>See the magic of APIs without having to understand them.</p>
                            <div className="d-flex justify-content-around">
                                <Link to="/api/posts/all">All posts</Link>
                                <Link to="/api/post/create">Create a post</Link>
                            </div>
                        </div>
                    </div>
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
