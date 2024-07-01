import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { faComment, faCommentAlt, faHeart, faHeartCircleCheck, faPencil, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import AuthContext from "../../utils/AuthProvider";
import { useState } from "react";
import axios from "axios";

function ViewPost() {
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useParams()

    const {user, FormData, setFormData} = useContext(AuthContext)
    // const post = location?.state?.post && location.state.post
    // console.log(post)
    const [post, setPost] = useState([])
    const [loadingPost, setLoadingPost] = useState(false)
    const [likedPost, setLikedPost] = useState(post ? post.liked : false)
    const [dislikedPost, setDisLikedPost] = useState(post ? post.disliked : false)
    const [writeComment, setWriteComment] = useState(false)

    const likeButton = <FontAwesomeIcon icon={likedPost ? faHeartCircleCheck: faHeart} color={likedPost && "red"} size="lg"/>
    const dislikeButton = <FontAwesomeIcon icon={faThumbsDown} color={ dislikedPost&& "blue"} size="lg"/>
    const commentButton = <FontAwesomeIcon icon={faCommentAlt} color="black" size="lg"/>


    post && setFormData(post)

    const handleTime = (date) => {
        const date_ = new Date(date)
        return date_.toDateString()
    }

    const handleViewUser = (author) => {
        navigate(`/api/posts/user/${author.id}`, {state: {author:author}})

    }

    const handleEditPost = () => {
        navigate(`/api/post/edit/${post.id}`)
    }

    const handleTag = (title) => {
        // spread the string title argument creating an array with elements
        const new_title = [...title.split(" ")]
        
        // declare #tag string
        let string_title = '##'

        // loop through the array of title elements 
        // converting first char of element to uppercasae
        if(new_title.length){
            for(let i=0; i<new_title.length; i++){
                new_title[i] = new_title[i][0].toUpperCase() + new_title[i].slice(1)
                // append each element to the string
                string_title += new_title[i]
            }
        }
        // return the converted array elements as a string
        return string_title
    }

    const handleLike = (post) => {
        if(user.fullname){
            if(!likedPost){
                setLikedPost(true)
                setDisLikedPost(false)
                // const post_ = [...post]
                post.total_likes += 1
            }
        }else{
            alert("Login to Like this post")
        }
    }

    const handleDislike = () => {
        if(user.fullname){
            if(!dislikedPost){
                setDisLikedPost(!dislikedPost)
                setLikedPost(false)
            }
        }else{
            alert("Login to Dislike this comment")
        }
    }

    const handleComment = () => {
        if(user.fullname){
            setWriteComment(!writeComment)
        }else{
            alert('Login to comment this post')
        }
    }

    useEffect(()=>{
        const handleFetchPost = async() => {
            try {
                setLoadingPost(false)
                const endpoint = `http://localhost:8000/api/post/view/${id}`
                const {data,status} = await axios.get(endpoint)
                console.log(data, status)
                if(status === 200){
                    data.liked && setLikedPost(true)
                    data.disliked && setDisLikedPost(true)
                    setLoadingPost(true)
                    setPost(data)
                }
            } catch (error) {
                setLoadingPost(false)
            }
        }
        handleFetchPost()

    }, [])

    return ( 
        <div className="p-4 post">
            {
                loadingPost &&
                <div className="row px-5 py-3 g-2">
                    <div style={{maxHeight:150}} className="col-post col-lg-6 col-md-6 col-sm-12 bg-white border">
                        <div className="p-3">
                            <p hidden>{post.id}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    <p className="mb-0 post-p">
                                        <span>{handleTag(post.title)}</span>
                                        <span onClick={()=>handleViewUser(post.author)} className="mx-2">
                                            <Link
                                                className="link-post">
                                                @{post.author.fullname.split(" ")[0]}
                                            </Link>
                                        </span>
                                    </p>
                                </span>

                                <span>
                                    <p className="mb-0 text-end">
                                        {user.fullname && post.author.fullname.toLowerCase() === user.fullname.toLowerCase() && 
                                        <div style={{cursor:'pointer'}} onClick={()=>handleEditPost()}>
                                            <span style={{fontSize:13}} className="mx-1">edit</span>
                                            <span><FontAwesomeIcon icon={faPencil}/></span>
                                        </div>}
                                    </p>
                                </span>
                            </div><hr/>

                            <div className="my-1" style={{lineHeight:'2'}}>
                                <p>{post.content}</p>

                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="mx-0">
                                            <span style={{cursor:'pointer'}} onClick={()=>handleLike(post)} className="mx-1">{likeButton}</span>
                                            <span >
                                                {post.liked ? parseInt(post.total_likes)+1 : post.total_likes}
                                            </span>
                                        </span>
                                        
                                        <span className="mx-1">
                                            <span style={{cursor:'pointer'}} onClick={()=>handleDislike()} className="mx-2">{dislikeButton}</span>
                                            <span  className="mx-1">
                                                {post.disliked ? parseInt(post.total_dislikes)+1 : post.total_dislikes}
                                            </span>
                                        </span>

                                        <span className="mx-0">
                                            <span onClick={handleComment} style={{cursor:'pointer'}} className="mx-1">{commentButton}</span>
                                            <span className="mx-1">{post.comment.length}</span>
                                        </span>

                                    </div>
                                    <span className="text-info">{handleTime(post.created_at)}</span>
                                </div>
                            </div>
                        </div>
                        {
                            writeComment &&
                            <div className="p-2 bg-white border">
                                <form onSubmit={(e)=>e.preventDefault()}>
                                    <div className="input-group form-control">
                                        <input required className="form-control" type="text" placeholder="comment now..." />
                                        <button className="btn-comment">Comment</button>
                                    </div>

                                </form>
                            </div>
                        }                    
                    </div>

                    {
                        user.fullname 
                        ?
                            post.comment.length > 0 &&
                            <div className="col-lg-6 col-md-6 col-sm-12 col-comments">
                                <h5 style={{fontWeight:500, fontSize:15}} className="text-start mx-2">Read other users comments</h5>
                                {
                                    post.comment.map((comment,key) => (
                                        <div className="border p-3 m-1 comments">
                                            <p className="text-primary">{comment.user.fullname}</p>
                                            <p>{comment.content}</p>
                                            <p>{handleTime(comment.created_at)}</p>
                                        </div>
                                    ))
                                }                                     
                            </div>
                        :
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <h5 style={{fontWeight:500, fontSize:23}} className="text-center text-success mx-2">Login to read other users comments</h5>
                            </div>
                        
                    }
                </div>
        }

        </div>
     );
}

export default ViewPost;