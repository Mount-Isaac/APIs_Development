import { useContext, useEffect } from "react";
import AuthContext from "../../utils/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const {user, formData, setFormData, authTokens, handleRefreshToken, tokensUpdated, setPostUpdated} = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()

    const handleUpdatePost = async() => {
        try {
            const endpoint = `http://localhost:8000/api/post/update/${id}`
            const headers = {
                'Authorization': `Bearer ${authTokens.access}`
            }
            const {data,status} = await axios.post(endpoint, formData, {headers})
            if(status === 200){
                console.log(data)
                setPostUpdated(true)
                navigate(`/api/post/view/${id}`, {state: {post:data}})
            }
            console.log(data, status)
        } catch (error) {
            const {status} = error?.response?.status && error.response
            if (status === 401){
                console.log(error.response.statusText)
                handleRefreshToken()
            }
            
        }
    }   

    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log(formData)
        handleUpdatePost()
    }

    useEffect(()=>{
        if(tokensUpdated){
            handleUpdatePost()
        }

    }, [tokensUpdated])

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

export default EditPost;