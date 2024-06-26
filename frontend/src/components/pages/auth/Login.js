import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";

function Login() {
    const {handleChange, handleLogin, formData} = useContext(AuthContext)


    return ( 
        <div style={{backgroundColor:'whitesmoke'}} className="border p-5 my-5">
        <h2 className="text-center mb-3 text-primary">Login User API</h2>
        <div>
            <form onSubmit={handleLogin}>
                <div className="row d-flex justify-content-center">
                    <div className="form-group col-lg-8 col-sm-12">
                        <label htmlFor="email">Email Address</label>
                        <input name="email" value={formData.email} onChange={handleChange} id="email" type="email" className="form-control" required />
                    </div>

                    <div className="form-group col-lg-8 col-sm-12">
                        <label htmlFor="password">Password</label>
                        <input name="password" value={formData.password} onChange={handleChange} id="password" type="password" className="form-control" required />
                    </div>




                    <div className="text-center m-4">
                        <input value="Login" type="submit" className="btn btn-primary btn-login" />
                    </div>

                </div>
            </form>
        </div>
    </div>
     );
}

export default Login;