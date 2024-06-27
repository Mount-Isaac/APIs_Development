import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import Data from './Data'
import AuthContext from '../../utils/AuthProvider';
import axios from 'axios';

const JsonEditor = ({object, auth, file}) => {
    // console.log(file, 'file passed')
    const [inputObject, setInputObject] = useState(JSON.stringify(object, null, 2));
    const [formData, setFormData]  = useState()
    const [oneRun, setOneRun] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileAdded, setFileAdded] = useState(false)
    const {user} = useContext(AuthContext)

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
        setFormData(JSON.parse(inputObject))
    
        // Further processing can be added here, e.g., sending data to a server
    };

    useEffect(()=> {
        if(formData && !oneRun){
            setFormData(prevData =>({
                ...prevData,
                image : selectedFile
            }))
            setFileAdded(true)
            setOneRun(true)
        }

    }, [formData])

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
                try {
                    const endpoint = 'http://localhost:8000/api/auth/register'
                    const headers = {'Content-Type':'multipart/form-data'}
    
                    const {data, status} = await axios.post(endpoint, my_data, {headers})
                    console.log(data, status)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(my_data)
            registerUser(my_data)

        }

    }, [fileAdded,formData])

    return (
        <div>
            {
                auth ?
                user.email ?
                    <>
                        <h5 className='text-center'>Edit user object and upload image</h5>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                id='textarea'
                                rows= {file ? "8" : "5"}
                                cols="50"
                                value={inputObject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <br />
                            {
                                file && 
                                <>
                                    <label htmlFor="fileInput">Upload Image:</label><br />
                                    <input required className='input-group mb-2' type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
                                </>
                            }
                            <input type="submit" value="Submit" />
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
                                rows= {file ? "8" : "5"}
                                cols="50"
                                value={inputObject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <br />

                            {
                                file && 
                                <>
                                    <label htmlFor="fileInput">Upload Image:</label><br />
                                    <input required className='input-group mb-2' type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
                                </>
                            }
                            <input type="submit" value="Submit" />
                        </form>
                    </>
            }
        </div>
    );
};

function User() {
    const arrowElement = <FontAwesomeIcon icon={faChevronDown} size='lg'/>
    const [show, setShow] = useState(new Array(Data.length).fill(false))
    const [test, setTest] = useState(new Array(Data.length).fill(false))
    
    const handleShow = (index) => {
        // console.log(index)
        setShow(prevState =>{
            const newState = [...prevState]
            newState[index] = !newState[index]
            return newState;
        });
    };
    // console.log(show)

    const handleTest = (index) => {
        setTest(prevState => {
            const newState = [...prevState]
            newState[index] = !newState[index]
            return newState
        })
    }
    return ( 
        <div className="container p-2 users-container">
            <h3 className="text-center">User endpoints</h3> 
            <div className="myhr"></div>

            <div className="api">
                {
                    Data.map((obj,index)=>(
                    <>
                        <h4>{obj.title}</h4>
                        <p key={index} className="api-p border p-2 pb-2">
                            <span><button className="btn btn-secondary btn-custom">Post</button></span>
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
                                    {

                                        !obj.auth &&
                                        <div className='col-lg-6 col-md-6 col-sm-12 bg-dark text-white'>
                                            <pre>
                                                {
                                                    JSON.stringify(obj.object, null, 4)
                                                }
                                            </pre>
                                        </div>
                                    }

                                    {
                                        test[index] &&      
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <JsonEditor object={obj.object} auth={obj.auth} file={obj.file}/>                                        
                                        </div>
                                    }

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

export default User;