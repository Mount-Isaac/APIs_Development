import { faHeart, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../utils/AuthProvider";

function AllPosts() {
    const{posts} = useContext(AuthContext)
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

    const handleViewUser = (author) => {
        navigate(`/api/posts/user/${author.id}`, {state: {author:author}})

    }
    
    return ( 
        <div style={{backgroundColor:'whitesmoke'}} className="container-fluid pb-5">
            <h2 className="text-center py-2 text-primary">View and scroll all posts</h2>
        {
            posts && posts.map((post, key) => (
                <div  key={key} className="border p-3 m-3 bg-white">
                    <p hidden>{post.id}</p>
                    <p 
                        style={{fontWeight:600, fontSize:19}}>
                        {post.title}
                        <span className="mx-2">by</span>
                        <span onClick={()=>handleViewUser(post.author)}
                            className="mx-1" 
                            style={{fontSize:13, fontWeight:400}}>
                                <Link to=
                                    {{
                                        pathname:`/api/posts/user/${post.author.id}`,
                                        state: {author : post.author}
                                    }}
                                    className="link-post">
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

export default AllPosts;