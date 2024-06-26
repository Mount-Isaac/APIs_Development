// const UserDefinedFunctions = () => {
//     return ( 
//         <div>
//             UserDefinedFunctions
//         </div> 
//     );
// }
 
// export default UserDefinedFunctions;
import { useContext } from "react"
import AuthContext from "../../utils/AuthProvider"


const HandleSubmit = (e) => {
    e.preventDefault()
    
    const {formData} = useContext(AuthContext)

    console.log(formData)
    const endpoint = ''
}


const HandleChange =  (e) => {
    const {setFormData} = useContext(AuthContext)
    const {name, value} = e.target

    setFormData(prevData => ({
        ...prevData, 
        [name]:value
    }))
}
export {HandleSubmit, HandleChange}
