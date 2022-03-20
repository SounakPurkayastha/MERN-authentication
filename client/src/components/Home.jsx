import AuthContext from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const Home = () => {
  const authContext = useContext(AuthContext);
  let [message, setMessage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getMessage();
  }, []);

  const getMessage = async () => {
    const response = await axios.get("/secret", {
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    });
    setMessage(response.data.message);
  };

  const reloadHandler = () => {
    history.push("/home");
  };

  const backHandler = () => {
    history.goBack();
  };

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <div>
      {message}
      <button onClick={reloadHandler}>Reload</button>
      <button onClick={backHandler}>Back</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Home;
