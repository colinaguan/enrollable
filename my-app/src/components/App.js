import React from "react"
import Signup from "./Signup";
import Login from "./Login"
import ClassSearch from "./ClassSearch"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={ClassSearch} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
  )
}

export default App;
