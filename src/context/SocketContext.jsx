import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"
import { AuthContext } from "./AuthContext";
import { SERVER_URL } from "../lib/apiRequest";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setSocket(io(SERVER_URL));
    }, []);

    useEffect(() => {
      if(currentUser){
        socket?.emit("newUser", currentUser.id);
      }
    }, [currentUser, socket])
    

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}