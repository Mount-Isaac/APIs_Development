import { useLocation, Link, useNavigate } from "react-router-dom";
import { faComment, faCommentAlt, faHeart, faPencil, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AuthContext from "../../utils/AuthProvider";
import { useState } from "react";

function ViewPost() {
    const likeButton = <FontAwesomeIcon icon={faHeart} color="red" size="lg"/>
    const dislikeButton = <FontAwesomeIcon icon={faThumbsDown}  size="lg"/>
    const commentButton = <FontAwesomeIcon icon={faCommentAlt} color="black" size="lg"/>

    const location = useLocation()
    const navigate = useNavigate()

    const {user} = useContext(AuthContext)
    const post = location?.state?.post && location.state.post
    console.log(post)

    const handleTime = (date) => {
        const date_ = new Date(date)
        return date_.toDateString()
    }

    const handleViewUser = (author) => {
        navigate(`/api/posts/user/${author.id}`, {state: {author:author}})

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

    return ( 
        <div className="p-4 post">
            <div className="row px-5 py-3">
                {
                    post && 
                        <div className="col-lg-6 col-md-6 col-sm-12 col-post bg-white border">
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
                                            <div>
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
                                                <span className="mx-1">{likeButton}</span>
                                                <span>{post.total_likes}</span>
                                            </span>
                                            
                                            <span className="mx-1">
                                                <span className="mx-2">{dislikeButton}</span>
                                                <span className="mx-1">{post.total_dislikes}</span>
                                            </span>

                                            <span className="mx-0">
                                                <span className="mx-1">{commentButton}</span>
                                                <span className="mx-1">{post.total_dislikes}</span>
                                            </span>

                                        </div>
                                        <span className="text-info">{handleTime(post.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

                <div className="col-lg-6 col-md-6 col-sm-12 col-ads">
                    Other adds
                </div>
            </div>
        </div>
     );
}

export default ViewPost;