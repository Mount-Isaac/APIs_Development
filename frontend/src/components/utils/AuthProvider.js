import React, { createContext, useEffect, useState } from 'react'

// create a context object to share data between the components 
const AuthContext = createContext()
export default AuthContext

// define the data variables here 
const [user, setUser] = useState({'user': ""});
const [updateTokens, setUpdateTokens] = useState(false)
const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') && JSON.parse(localStorage.getItem('authTokens')))


// define the functions here 
const handleLogin = () => {
    // simulation function
    return 'logged in'
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

// data passed between component
const contextData = {
    // variables
    user:user,
    authTokens:authTokens,

    // dispatchers
    setUser:setUser,

    // functions
    handleLogin:handleLogin
}

// provider to all accessing the data
const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}