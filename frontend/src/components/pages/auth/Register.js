import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";

function Register() {
    const {handleChange, handleSubmit, formData, setFormData} = useContext(AuthContext)
    const handleFile = (e) => {
        const file = e.target.files[0]

        setFormData(prevData => ({
            ...prevData, 
            image: file
        }))


    }
    return ( 
        <div style={{backgroundColor:'whitesmoke'}} className="border p-3 my-3 shadow">
            <h2 className="text-center mb-3 text-primary">Register User API</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center">
                        <div className="form-group col-lg-8 col-sm-12">
                            <label htmlFor="email">Email Address</label>
                            <input name="email" value={formData.email} onChange={handleChange} id="email" type="email" className="form-control" required />
                        </div>

                        <div class="d-flex justify-content-center">
                            <div class="form-group col-lg-4 col-md-6 col-sm-12 mx-1">
                                <label htmlFor="first_name">Firstname</label>
                                <input name="first_name" value={formData.first_name} onChange={handleChange} id="first_name" type="text" className="form-control" required />
                            </div>

                            <div class="form-group col-lg-4 col-md-6 col-sm-12">
                                <label htmlFor="last_name">Lastname</label>
                                <input name="last_name" value={formData.last_name} onChange={handleChange} id="last_name" type="text" className="form-control" required />
                            </div>
                        </div>

                        <div class="d-flex justify-content-center">
                            <div class="form-group col-lg-4 col-md-6 col-sm-12 mx-1">
                                <label htmlFor="phone">Phone number</label>
                                <input name="phone_number" value={formData.phone_number} onChange={handleChange} id="phone" type="number" className="form-control" required />
                            </div>


                            <div class="form-group col-lg-4 col-md-6 col-sm-12">
                                <label htmlFor="password">Password</label>
                                <input name="password" value={formData.password} onChange={handleChange} id="password" type="password" minLength={8} className="form-control" required />
                            </div>
                        </div>

                        <div className="form-group col-lg-8 col-sm-12">
                            <label htmlFor="image">Profile Photo</label>
                            <input onChange={handleFile} type="file" accept="image/" className="form-control"  />
                        </div>

                        <div className="text-center m-4">
                            <input type="submit" className="btn btn-success btn-submit" />
                        </div>

                    </div>
                </form>
            </div>
        </div>
     );
}

export default Register;