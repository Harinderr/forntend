import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export const userContext = createContext({})
 export default function UserContextProvider({children}){
    const [user, setUser] = useState('')
    const [id, setId] = useState('')
    useEffect(()=> {
        axios.get('/profile').then((response)=> {
            setUser(response.data.username)
            setId(response.data.userid)
        })
    })
    return (
   <userContext.Provider value={{user, setUser, id, setId}}>
   {children}
   </userContext.Provider>
    )
}
