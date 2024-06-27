const Data = [
    {
        auth:false,
        file:true,
        title: "Create user",
        endpoint: "/api/auth/register",
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
        file:false,
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
        title: "Change Password",
        endpoint: "/api/auth/change-password",
        text: "Change the user's password by posting new password data to this endpoint",
        object: {
            old_password: '',
            new_password: '',
        }
    },
    {
        auth:true,
        file:true,
        title: "Update User",
        endpoint: "/api/users/update",
        text: "Update user profile information by posting updated data to this endpoint",
        object: {
            email: '',
            first_name: '',
            last_name: '',
            phone_number: '',
        }
    },

    {
        auth:true,
        title: "Delete User",
        endpoint: "/api/users/delete",
        text: "Delete a user account by sending a request to this endpoint",
    },
    {
        auth:true,
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
