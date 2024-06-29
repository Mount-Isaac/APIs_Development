import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthContext from "../../utils/AuthProvider";

import { faHeart, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";


function UserPosts() {
    const {id} = useParams()
    const [userPosts, setUserPosts] = useState(false)
    const location = useLocation()
    const {author} = location?.state?.author ? location.state : ""
    console.log(author)

    const navigate = useNavigate();
    const likeButton = <FontAwesomeIcon icon={faHeart} color="red" size="lg"/>
    const dislikeButton = <FontAwesomeIcon icon={faThumbsDown} color="blue" size="lg"/>

    const handleTime = (date) => {
        const date_ = new Date(date)
        return date_.toLocaleString()
    }

    const handleViewPost = (post) => {
        navigate(`/api/post/view/${post.id}`, {state: {post:post}})

    }

    useEffect(()=> {
        const getUserPosts = async() => {
            const endpoint = `http://localhost:8000/api/post/user/${id}`
            const {data, status} = await axios.get(endpoint)
            setUserPosts(data)
        }

        getUserPosts()
    }, [])

    return ( 
        <div style={{backgroundColor:'whitesmoke'}} className="container-fluid pb-5">
            <h2 className="text-center py-2 text-primary">
                <span className="text-primary">All {author.fullname}'s posts</span>
                {/* <span className="text-primary">Posts</span> */}
            </h2>
            {
            userPosts && userPosts.map((post, key) => (
                <div  key={key} className="border p-3 m-3 bg-white">
                    <p hidden>{post.id}</p>
                    <p 
                        style={{fontWeight:600, fontSize:19}}>
                        {post.title}
                        <span className="mx-2">by</span>
                        <span
                            className="mx-1" 
                            style={{fontSize:13, fontWeight:400}}>
                                <Link to={`/api/posts/user/${post.author.id}`} className="link-post">
                                    {post.author.fullname}
                                </Link>
                        </span>


                    </p>
                    <div style={{cursor:'pointer'}} onClick={()=>handleViewPost(post)} >
                        <p>{post.content.slice(1,100)}...</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <span className="mx-1">
                                    <span className="mx-1">{likeButton}</span>
                                    <span>{post.total_likes}</span>
                                </span>
                                
                                <span className="mx-1">
                                    <span className="mx-2">{dislikeButton}</span>
                                    <span className="mx-1">{post.total_dislikes}</span>
                                </span>

                            </div>
                            <span>{handleTime(post.created_at)}</span>
                        </div>
                    </div>
                </div>
            ))
        }

        </div>
     );
}

export default React.memo(UserPosts);