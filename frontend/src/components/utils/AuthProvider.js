import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

// create a context object to share data between the components 
const AuthContext = createContext()
export default AuthContext

// provider to all accessing the data
const AuthProvider = ({children}) => {
    // define the data variables here 
    const [user, setUser] = useState({'user': ""});
    const [formData, setFormData] = useState({})
    const [updateTokens, setUpdateTokens] = useState(false)
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') && JSON.parse(localStorage.getItem('authTokens')))
    const url = "http://localhost:8000/api/"

    // define the functions here 
    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formData)
        // simulation function
        // return 'logged in'
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // post data to the backend endpoint now
        const handleRegister = async() => {
            const endpoint = `${url}auth/register`
            const headers = {
                'Content-Type': 'application/json'
            }

            try {
                const {data, status} = await axios.post(endpoint, formData, {headers})
                if(status === 200){
                    console.log(data)
                }
                console.log(status, data)
            } catch (error) {
                console.log(error.response)
            }
        }
        console.log(formData)
        handleRegister()
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

        // dispatchers
        setUser:setUser,
        setFormData, setFormData,

        // functions
        handleLogin:handleLogin,
        handleSubmit:handleSubmit,
        handleChange:handleChange,
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