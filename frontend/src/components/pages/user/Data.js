const Data = [
    {
        auth:false,
        url:"http://localhost:8000/api/auth/register",
        endpoint:"/api/auth/register",
        code:201,
        file:true,
        title: "Create user",
        text: "Create a user account by posting profile data to this endpoint",
        object: {
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            password: '',
        }
    },


    {
        auth:false,
        url:"http://localhost:8000/api/auth/login",
        file:false,
        code:200,
        title: "Login",
        endpoint: "/api/auth/login",
        text: "Authenticate and log in a user by posting credentials to this endpoint",
        object: {
            username: '',
            password: '',
        }
    },


    {
        auth:true,
        url:"http://localhost:8000/api/user/update/password",
        endpoint:"/api/user/update/password",
        title: "Change Password",
        code:202,
        text: "Change the user's password by posting new password data to this endpoint",
        object: {
            old_password: '',
            new_password: '',
        }
    },


    {
        auth:true,
        url:"http://localhost:8000/api/user/update/profile",
        endpoint:"/api/user/update/profile",
        code:202,
        file:false,
        title: "Update User",
        text: "Update user profile information by posting updated data to this endpoint",
        object: {
            first_name: '',
            last_name: '',
            phone_number: '',
        }
    },

    {
        auth:true,
        url:"http://localhost:8000/api/user/delete/",
        endpoint:"/api/user/delete/",
        code:204,
        title: "Delete User",
        endpoint: "/api/users/delete",
        text: "Delete a user account by sending a request to this endpoint",
    },


    {
        auth:true,
        url:"http://localhost:8000/api/user/update/email",
        endpoint:"/api/user/update/email",
        code:200,
        title: "Change Email",
        endpoint: "/api/users/change-email",
        text: "Change the user's email address by posting new email data to this endpoint",
        object: {
            old_email: "",
            new_email: ''
        }
    }
];

export default Data;
