import LoginForm from "./Components/LoginForm";
import LoginSuccess from "./Components/LoginSuccess";
import Header from "./Components/Header";
import AuthContext from "./Components/store/auth-context";
import { useContext } from "react";
import React from "react";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <>
      {!ctx.isLoggedIn ? <LoginForm />:
      ctx.isLoggedIn &&
      <Header><LoginSuccess/></Header> }
    </>
  );
}

export default App;
