import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email,pwd) => {},
  signIn:true
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signIn,setSignIn]=useState(true);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (email,pwd) => {
    setIsLoggedIn(true);
  };

  const createHandler=(n,e,p)=>{
    setIsLoggedIn(true);
    setSignIn((prevState)=>{return !prevState})
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        signIn:signIn,
        onCreate:createHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;