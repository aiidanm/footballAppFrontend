import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/userContext"

export const RoleRoute = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading) return <div>Loading...</div>
    if(!user){
        return <Navigate to="/login"/>
    }

    if(user.role !== requiredRole){
        return <Navigate to="/"/>

    }

    return children
}