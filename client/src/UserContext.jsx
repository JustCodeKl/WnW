/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [logout, setLogout] = useState(false);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if(!user){
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                    setReady(true);
                });
            
        }
    }, [user])

    return (
       <UserContext.Provider value={{user, setUser, ready, logout, setLogout, redirect, setRedirect}}>
         {
            children
        }
       </UserContext.Provider >
    )
}