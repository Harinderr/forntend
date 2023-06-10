import { useContext } from "react";
import { userContext } from "../userContext";
import Register from "./Register";
import Chat from "./Chat";

export default function Route(){
    const {user, id} = useContext(userContext)
    if(user){
        return (<Chat/> )
        
    }
    return (
        <Register/>
    )
}