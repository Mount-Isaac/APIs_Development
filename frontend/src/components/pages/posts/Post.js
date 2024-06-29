import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import Data from './Data'
import AuthContext from '../../utils/AuthProvider';
import axios from 'axios';


function Post() {
    const arrowElement = <FontAwesomeIcon icon={faChevronDown} size='lg'/>
    const [show, setShow] = useState(new Array(Data.length).fill(false))
    const [test, setTest] = useState(new Array(Data.length).fill(false))
    const [userCreated, setUserCreated] = useState(new Array(Data.length).fill(false))
    const [returnedData, setReturnedData] = useState(new Array(Data.length).fill({}))

    const {user} = useContext(AuthContext)

    const handleUserCreated = (index) => {
        setUserCreated(prevState => {
            const newState = [...prevState]
            newState[index] = !newState[index]
            return newState
        })
    }

    const handleSetReturnedData = (index, data) => {
        console.log('before', userCreated[index])
        // handleUserCreated(index)

        setUserCreated(prevState => {
            const newUserState = [...prevState]
            newUserState[index] = !newUserState[index]
            return newUserState
        })

        setReturnedData(prevState => {
            const newDataState = [...prevState]
            newDataState[index] = data
            return newDataState
        })
        // handle user created
        console.log('after', userCreated[index])

    }

    // console.log(returnedData)
    console.log(userCreated)
    const JsonEditor = ({obj, index}) => {
        // console.log(file, 'file passed')
        const [inputObject, setInputObject] = useState(
            obj.object ? JSON.stringify(obj.object, null, 2) : null
        );
        const [formData, setFormData]  = useState()
        const [oneRun, setOneRun] = useState(false)
        const [selectedFile, setSelectedFile] = useState(null);
        const [fileAdded, setFileAdded] = useState(false)
        const [switchGet, setSwitchGet] = useState(false)
        const {user, setUser, setAuthTokens, authTokens} = useContext(AuthContext)
        const [loading, setLoading] = useState(false)
        const spinner = <FontAwesomeIcon icon={faSpinner} spin />
    
        const handleChange = (event) => {
            setInputObject(event.target.value)
        };
    
        const handleBlur = () => {
            try {
                const parsedObject =  JSON.parse(inputObject);
                setInputObject(JSON.stringify(parsedObject, null, 2))
            } catch (error) {
                console.log('Do not edit the  JSON object format')
            }
    
        }
    
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file)
        };
    
        const handleSubmit = (event) => {
            event.preventDefault()

            if(obj.method){
                setSwitchGet(true)
            }else{
                setFormData(JSON.parse(inputObject))
            }
        
            // Further processing can be added here, e.g., sending data to a server
        };
    
        useEffect(()=> {
            if(formData && !oneRun){
                // setFormData(prevData =>({
                //     ...prevData,
                //     image : selectedFile
                // }))
                setFileAdded(true)
                setOneRun(true)
            }
    
        }, [formData])
    
        // handling posts reqeuest
        useEffect(()=> {
            if(fileAdded){
                console.log(formData)
                const my_data = new FormData()
    
                for(let key in formData){
                    my_data.append(key, formData[key])
                }
            
                setFileAdded(false)
                // console.log(formData)
    
                // send the data to backend and return response 
                const registerUser = async (my_data) => {
                    let headers;
                    try {
                        setLoading(true)
                        obj.auth ? 
                            headers = {
                                'Content-Type':'application/json',
                                'Authorization': `Bearer ${authTokens.access}`
                            }
                            :
                            headers = {'Content-Type':'multipart/form-data'}

        
                        const {data, status} = await axios.post(obj.url, my_data, {headers})
                        console.log(status, data)
                        if(status === obj.code){
                            if(status === 201){
                                // handleUserCreated(index)
                                handleSetReturnedData(index, data)
                                // console.log('password updated successfully.')
                            }else if(status === 200){
                                // user login
                                handleSetReturnedData(index, data)
                                // setUser(data.user)
                                // setAuthTokens({
                                //     access: data.access,
                                //     refresh: data.refresh
                                // })
                                // cache the user & tokens
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
                                // handleUserCreated(index)

                            }else if(status === 204){
                                // user deleted
                                handleSetReturnedData(index, {'data':'You account has been deleted successfully.'})
                                setUser({user:''})
                                setAuthTokens('')
                                // handleUserCreated(index)
                            }
                            // handle endpoint data posting
                            // handleUserCreated(index)
                            setLoading(false)
                        }else{
                            // handleUserCreated(index)
                            handleSetReturnedData(index, {"Error": "Refresh the page and try again."})
                            setLoading(false)
                        }
                        // console.log(data, status)
                        
                    } catch (error) {
                        // handleUserCreated(index)
                        setLoading(false)
                        handleSetReturnedData(index, {"Error": "Refresh the page and try again."})
                        console.log(error)
                    }
                }
                console.log(my_data)
                registerUser(my_data)
    
            }
    
        }, [fileAdded,formData])
    
        // handling get request
        useEffect(()=> {

            const handleGetRequests = async () => {
                console.log(formData)
                const {data, status} = await axios[obj.method](obj.url)
                console.log(data, status)

                if(obj.code === status){
                    handleSetReturnedData(index, data)
                }
            }

            if(switchGet){
                handleGetRequests()
            }

        }, [switchGet])

        return (
            <div>
                {
                    obj.auth ?
                    user.email ?
                        <>
                            <h5 className='text-center'>Edit user object and upload image</h5>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    id='textarea'
                                    rows= {obj.file ? "8" : "5"}
                                    cols="50"
                                    value={inputObject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                {
                                    obj.file && 
                                    <>
                                        <label htmlFor="fileInput">Upload Image:</label><br />
                                        <input required className='input-group mb-2' type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
                                    </>
                                }
                                <div className='text-center'>
                                    <button style={{width:150}}>
                                        {loading ? spinner : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </>
                    :
                    <div>
                        You must be authenticated to access this route
                    </div>
                    :
                    <>
                            <h5 className='text-center'>Edit user object and upload image</h5>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    id='textarea'
                                    rows= {obj.file ? "8" : "5"}
                                    cols="50"
                                    value={inputObject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
    
                                {
                                    obj.file && 
                                    <>
                                        <label htmlFor="fileInput">Upload Image:</label><br />
                                        <input required className='input-group mb-2' type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
                                    </>
                                }
                                <div className='text-center'>
                                    <button style={{width:150}}>
                                        {loading ? spinner : "Submit"}
                                    </button>

                                </div>
                            </form>
                        </>
                }
            </div>
        );
    };
    
    const handleShow = (index) => {
        // console.log(index)
        setShow(prevState =>{
            const newShowState = [...prevState]
            newShowState[index] = !newShowState[index]
            return newShowState;
        });
    };
    // console.log(show)

    const handleTest = (index) => {
        setTest(prevState => {
            const newTestState = [...prevState]
            newTestState[index] = !newTestState[index]
            return newTestState
        })
    }


    return ( 
        <div className="container p-2 users-container">
            <h3 className="text-center">Post endpoints</h3> 
            <div className="myhr"></div>

            <div className="api">
                {
                    Data.map((obj,index)=>(
                    <>
                        <h4>{obj.title}</h4>
                        <p key={index} className="api-p border p-2 pb-2">
                            <span>
                                <button onClick={()=>handleShow(index)} className="btn btn-secondary btn-custom">
                                    {
                                        obj.method ? obj.method[0].toLocaleUpperCase()+obj.method.slice(1) : "Post"
                                    }
                                </button>
                            </span>
                            <span>{obj.endpoint}</span>
                            <span className="mx-3">{obj.text}</span>
                            <span onClick={()=>handleShow(index)}>{arrowElement}</span>
                        {
                           
                            show[index] && 
                            <div className='api-div py-3 pb-0'>
                                <p className='d-flex justify-content-between'>
                                    <span>Parameters</span> 
                                    <span>
                                        <button onClick={()=>handleTest(index)} 
                                            className={`btn btn-outline-${test[index] ? 'danger' : 'secondary'}`}>
                                            {test[index] ? "Cancel" : "Test it out"}
                                        </button>
                                    </span>
                                </p>

                                <div className='px-1 row row-testing'>
                                    {userCreated[index] ? (
                                        <pre>
                                            {
                                                test[index] &&
                                                JSON.stringify(returnedData[index], null, 2)
                                            }
                                        </pre>
                                    ) : (
                                        <>
                                            {!obj.auth && (
                                                <div className='col-lg-6 col-md-6 col-sm-12 bg-dark text-white'>
                                                    <pre>{JSON.stringify(obj.object, null, 4)}</pre>
                                                </div>
                                            )}

                                            {test[index] && (
                                                <div className='col-lg-6 col-md-6 col-sm-12'>
                                                    <JsonEditor obj={obj} index={index} />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                            </div>
                        }
                        </p>
                    </>

                    ))
                }

            </div>
        </div>
     );
}

export default Post;