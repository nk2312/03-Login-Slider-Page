import { useContext } from "react";
import AuthContext from "./store/auth-context";

const LoginSuccess = () => {
    const ctx=useContext(AuthContext)
    return (
        <>
            <AuthContext.Consumer>
                {(ctx)=>{
                    return (<>
                        <h1 className="heading">WELCOME</h1>
                        {ctx.signIn?<p>....logged in successfully</p>:<p>......Account created successsfully</p> }
                     <button  className="logout" onClick={ctx.onLogout}>Logout</button></>)
                }}
            </AuthContext.Consumer>
        </>
    )
}

export default LoginSuccess;




