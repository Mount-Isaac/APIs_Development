function Posts() {
    return (  
        <div className="container p-5">
            <h3 className="text-center">All Posts API endpoints</h3>

            <div className="py-3 my-3 border text-center">
                <p>Our Post will simulate all the features in 
                    <span className="text-primary mx-1">X</span> 
                    formerly 
                    <span className="text-info mx-1">Twitter</span> 
                    when a post is created.
                </p>

                <pre className="pt-2 text-success">Create, update, delete, like, unlike, follow, unfollow, comment, and bookmark a post</pre>
            </div>
        </div>
    );
}

export default Posts;