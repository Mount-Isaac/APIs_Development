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
    const [updateTokens, setUpdateTokens] = useState(false)
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

    // data passed between component
    const contextData = {
        // variables
        user:user,
        authTokens:authTokens,
        formData:formData,
        loading:loading,

        // dispatchers
        setUser:setUser,
        setFormData, setFormData,
        setAuthTokens:setAuthTokens,

        // functions
        handleLogin:handleLogin,
        handleSubmit:handleSubmit,
        handleChange:handleChange,
        handleLogout:handleLogout
    }

    // define useEffects hooks here 
    useEffect(()=> {
        const twenty_minutes = 60 * 1000 * 20
        let timeoutid

        timeoutid = setTimeout(()=> {
            // update tokens by accessing refresh endpoint
            // simulation
            setAuthTokens({'access': '', 'refresh': ''})

        }, twenty_minutes)

        // clear the timeout instance after 20 mins 
        // after tokens have been updated
        return () => {
            clearTimeout(timeoutid)
        }
    }, [updateTokens])


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export {AuthProvider}