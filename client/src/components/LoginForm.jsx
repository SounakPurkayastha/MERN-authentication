import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const axios = require("axios");

const LoginForm = () => {
  const authContext = useContext(AuthContext);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      authContext.login(response.data.token);
      history.push("/home");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default LoginForm;
