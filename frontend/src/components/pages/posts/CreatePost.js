import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";
import axios from "axios";

function CreatePost() {
    const {user, formData, setFormData, authTokens} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        const handleCreatePost = async() => {
            try {
                const endpoint = "http://localhost:8000/api/post/create"
                const headers = {
                    'Authorization': `Bearer ${authTokens.access}`
                }
                const {data,status} = await axios.post(endpoint, formData, {headers})
                console.log(data, status)
            } catch (error) {
                console.log(error)
                
            }
        }   
        // console.log(formData)
        handleCreatePost()
    }

    const handleChange = (e) => {
        const {name, value} = e.target 
        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }
    return ( 
        <div className="container-fluid p-5 d-flex justify-content-center bg-white">
            <div style={{backgroundColor:'whitesmoke'}} className="col-lg-9 col-md-9 col-sm-12 border p-4">
                <h5 
                    style={{fontWeight:600}} 
                    className="text-center text-primary">
                    Hey <span className="text-dark">{user.fullname}, 
                    </span> Let's help you create a post
                </h5><hr/>

                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center my-3">
                        <input name="title" value={formData.title} onChange={handleChange} required placeholder="Type your title here." className="title-text my-2" type="text"/>
                    </div>
                    <div>
                        <textarea name="content" value={formData.content} onChange={handleChange} required className="form-control content-text"/>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-outline-success btn-create">Submit</button>
                    </div>
                </form>

            </div>

        </div>
     );
}

export default CreatePost;