import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Login() {
    const {handleChange, handleLogin, formData, loading} = useContext(AuthContext)
    const spinnerElement = <FontAwesomeIcon icon={faSpinner} size="lg" spin/>

    return ( 
        <div style={{backgroundColor:'whitesmoke'}} className="border p-5 my-5">
        <h2 className="text-center mb-3 text-primary">Login User API</h2>
        <div>
            <form onSubmit={handleLogin}>
                <div className="row d-flex justify-content-center">
                    <div className="form-group col-lg-8 col-sm-12">
                        <label htmlFor="username">Email Address</label>
                        <input name="username" value={formData.username} onChange={handleChange} id="username" type="email" className="form-control" required />
                    </div>

                    <div className="form-group col-lg-8 col-sm-12">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={formData.password} onChange={handleChange} id="password" type="password" className="form-control" required />
                    </div>




                    <div className="text-center m-4">
                        <button type="submit" className="btn btn-primary btn-login">
                            {loading ? spinnerElement : "Login"}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    </div>
     );
}

export default Login;