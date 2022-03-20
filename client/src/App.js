import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          {!authContext.token && <LoginForm />}
          {authContext.token && <Redirect to="/home" />}
        </Route>
        <Route path="/home">
          {!authContext.token && <Redirect to="/login" />}
          {authContext.token && <Home />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
