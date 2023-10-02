import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();
const triveous = JSON.parse(localStorage.getItem('triveous'))||''
const triveousNews = JSON.parse(localStorage.getItem('triveousNews'))|| {}
function AuthContextProvider({ children }) {
  const [isAuth,setIsAuth] = useState(triveous==''?false : true);
  const [user , setUser] = useState(triveous=='' ? {} : triveous);
  const [singleNews , setSingleNews] = useState(triveousNews);



  const toggleAuth = ()=> {
    setIsAuth(!isAuth)
  }

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuth ,user, setUser , singleNews , setSingleNews }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;