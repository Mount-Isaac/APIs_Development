const Data = [
    {
        auth:true,
        url:"http://localhost:8000/api/post/create",
        endpoint:"/api/post/create",
        code:201,
        file:false,
        title: "Create a post",
        text: "Create a post by sending JSON object to this endpoint",
        object: {
            title: '',
            content: '',
        }
    },


    {
        auth:true,
        url:"http://localhost:8000/api/post/update/<str:id>",
        endpoint: "/api/post/update/<str:id>",
        file:false,
        code:200,
        title: "Update a post",
        text: "Edit and update a post if you are the owner(author).",
        object: {
            title: '',
            content: '',
        }
    },


    {
        method:'delete',
        auth:true,
        url:"http://localhost:8000/api/post/delete/<str:id>",
        endpoint:"/api/post/delete/<str:id>",
        title: "Delete a post",
        code:202,
        text: "Delete a given post if you are the owner(author).",
        object: {
            id: ''
        }
    },


    {
        method:'get',
        auth:false,
        url:"http://localhost:8000/api/post/view<str:id>",
        endpoint:"/api/post/view/<str:id>",
        code:202,
        file:false,
        title: "View a  post",
        text: "Read a given post and interact with it thro' likes, follow, comment...",
        object: {
            id: ''
        }
    },

    {
        method: 'get',
        auth:false,
        url:"http://localhost:8000/api/post/all",
        endpoint:"/api/post/all/",
        code:200,
        title: "All posts",
        text: "Read all the posts saved in the database.",
    },


    {
        method:'get',
        auth:false,
        url:"http://localhost:8000/api/post/all/user/<str:id>",
        endpoint:"/post/all/user/<str:id>",
        code:200,
        title: "All user posts for a user",
        text: "Provide the user id below, the endpoint will return all the posts for the given user.",
        object: {
            id: ''
        }
    }
];

export default Data;
