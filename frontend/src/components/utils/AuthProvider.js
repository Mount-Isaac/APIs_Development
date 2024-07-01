import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'

// create a context object to share data between the components 
const AuthContext = createContext()
export default AuthContext

// provider to all accessing the data
const AuthProvider = ({children}) => {
    // define the data variables here 
    const navigate = useNavigate()
    const [user, setUser] = useState(localStorage.getItem('customer') 
        ? JSON.parse(localStorage.getItem('customer'))
        : {'user': ""}
    );
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [tokensUpdated, setTokensUpdated] = useState(false)
    const [postUpdated, setPostUpdated] = useState(false) 
    const [posts, setPosts] = useState();
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') && JSON.parse(localStorage.getItem('Tokens')))
    const url = "http://localhost:8000/api/"

    // define the functions here 
    const handleLogin = async(e) => {
        e.preventDefault()
        console.log(formData)

        try {
            setLoading(true)
            const endpoint = `${url}auth/login`
            const headers = {
                'Content-Type': 'application/json'
            }
            const {status, data } = await axios.post(endpoint, formData, {headers})
            console.log(data, status)
            if(status === 200){
                localStorage.setItem('Tokens', JSON.stringify(
                    {
                        "refresh": data.refresh,
                        "access": data.access 
                    }
                ))
                localStorage.setItem('customer', JSON.stringify(data.user))

                setUser(data.user)
                setAuthTokens({
                    "refresh": data.refresh,
                    "access": data.access 
                })
            }
            setLoading(false)
            navigate('/')
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        // console.log(formData)
        // simulation function
        // return 'logged in'
    }

    // post data to the backend endpoint now
    const handleRegister = async() => {
        const my_data = new FormData()

        for(let key in formData){
            my_data.append(key, formData[key])
        }

        console.log(my_data)
        setLoading(true)

        const endpoint = `${url}auth/register`
        const headers = {
            'Content-Type': 'multipart/form-data'
        }

        try {
            const {data, status} = await axios.post(endpoint, my_data, {headers})
            if(status === 201){
                setUser(data)
                setLoading(false)
                navigate('/')
                console.log(data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error.response)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegister()
    }
    
    const handleLogout = () => {
        localStorage.removeItem('Tokens')
        localStorage.removeItem('customer')

        setUser({"user":""})
    }
    
    const handleChange =  (e) => {
        const {name, value} = e.target
    
        setFormData(prevData => ({
            ...prevData, 
            [name]:value
        }))
    }

    // const refresh tokens 
    const handleRefreshToken = async () => {
        try {
            setTokensUpdated(false);
            const endpoint = "http://localhost:8000/api/token/refresh"
            const {data,status} = await axios.post(endpoint, {refresh:authTokens.refresh})
            // console.log(data, status)
            if(status === 200){
                setAuthTokens(data)
                // update authtokens in local storage
                // remove them 
                localStorage.removeItem('Tokens');
                // add them
                localStorage.setItem('Tokens', JSON.stringify(
                    {
                        'access': data.access,
                        'refresh': data.refresh
                    }
                ));
                setTokensUpdated(true)
            };
        } catch (error) {
            console.log(error);
        }

    }

    // update a post 
    const handlePosts = async() => {
        try {
            const endpoint = "http://localhost:8000/api/post/all"
            const {data,status} = await axios.get(endpoint)
            console.log(data)
            setPosts(data)
            setLoadingPosts(true)
        } catch (error) {
            console.error(error)
        }
    }

    // data passed between component
    const contextData = {
        // variables
        user:user,
        authTokens:authTokens,
        formData:formData,
        loading:loading,
        loadingPosts:loadingPosts,
        posts:posts,
        tokensUpdated:tokensUpdated,
        postUpdated:postUpdated,

        // dispatchers
        setUser:setUser,
        setFormData, setFormData,
        setAuthTokens:setAuthTokens,
        setTokensUpdated:setTokensUpdated,
        setPostUpdated:setPostUpdated,

        // functions
        handleLogin:handleLogin,
        handleSubmit:handleSubmit,
        handleChange:handleChange,
        handleRefreshToken:handleRefreshToken,
        handleLogout:handleLogout
    }

    // define useEffects hooks here     
    useEffect(()=> {        
        handlePosts();

    }, [])

    useEffect(()=> {   
        if(tokensUpdated || postUpdated){
            console.log('posts updated')
            handlePosts();
            setPostUpdated(false)
        }

    }, [tokensUpdated, postUpdated])


    // refresh tokens evry 10 minutes
    useEffect(()=> {
        // server tokens expire after 10 mins so, 
        // update the frontend in 9 minutes to ensure the tokens remain valid 
        const ten_minutes = 1000*60*9
        // let id = ''

        const id = setInterval(()=> {
            handleRefreshToken()
            console.log('updated tokens')
        }, ten_minutes)

        return () => {clearInterval(id)}


    })

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export {AuthProvider}