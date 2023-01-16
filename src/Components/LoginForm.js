import React, { useEffect, useState, useReducer, useContext } from "react";
import AuthContext from "./store/auth-context";
import "./style.css";

const EmailReducer = (prevState, action) => {
  if (action.type === "EMAIL") {
    return { value: action.val, valid: action.val.includes("@") };
  }
  return { value: "", valid: false };
};

const PasswordReducer = (prevState, action) => {
  if (action.type === "PWD") {
    return { value: action.val, valid: action.val.length > 7 };
  }
  return { value: "", valid: false };
};

const NameReducer = (prevState, action) => {
  if (action.type === "NAME") {
    return { value: action.val, valid: action.val.length > 5 };
  }
};

const LoginForm = () => {
  const ctx = useContext(AuthContext);

  const [enteredEmail, dispatchEmail] = useReducer(EmailReducer, {
    value: "",
    valid: false,
  });
  const [enteredPwd, dispatchPwd] = useReducer(PasswordReducer, {
    value: "",
    valid: false,
  });
  const [name, dispatchName] = useReducer(NameReducer, {
    value: "",
    valid: false,
  });
  const [formValid, setFormValid] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const SignInUpToggler = () => {
    setSignIn((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("logged IN");
    ctx.onLogin(enteredEmail.value, enteredPwd.value);
  };
  const createAccountHandler = (event) => {
    event.preventDefault();
    console.log("created account");
    ctx.onCreate(name.value, enteredEmail.value, enteredPwd.value);
  };

  useEffect(() => {
    const identify = setTimeout(() => {
      setFormValid(enteredEmail.valid && enteredPwd.valid);
    }, 1000);

    return () => {
      clearTimeout(identify);
    };
  }, [enteredEmail, enteredPwd]);

  const emailHandler = (e) => {
    dispatchEmail({ type: "EMAIL", val: e.target.value });
  };
  const pwdHandler = (e) => {
    dispatchPwd({ type: "PWD", val: e.target.value });
  };
  const nameHandler = (e) => {
    dispatchName({ type: "NAME", val: e.target.value });
  };

  return (
    <React.Fragment>
      {signIn ? (
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={submitHandler} className="flex">
              <h1>Sign in</h1>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                onChange={emailHandler}
                value={enteredEmail.value}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={pwdHandler}
                value={enteredPwd.value}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={!formValid}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay-panel overlay-right ">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={SignInUpToggler}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" id="container">
          <div className="form-container sign-up-container form-right">
            <form onSubmit={createAccountHandler}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                onChange={nameHandler}
                value={name.value}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={emailHandler}
                value={enteredEmail.value}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={pwdHandler}
                value={enteredPwd.value}
              />
              <button type="submit" disabled={!formValid}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="overlay-container overlay-left">
            <div className="overlay-panel ">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={SignInUpToggler}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
