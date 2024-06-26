import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// create a context object to share data between the components 
const AuthContext = createContext()
export default AuthContext

// provider to all accessing the data
const AuthProvider = ({children}) => {
    // define the data variables here 
    const navigate = useNavigate()
    const [user, setUser] = useState({'user': ""});
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
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
        const my_data = new FormData()
        
        // post data to the backend endpoint now
        const handleRegister = async(my_data) => {
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

        for(let key in formData){
            my_data.append(key, formData[key])
        }
        handleRegister(my_data)
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