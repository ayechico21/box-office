import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
function App() {
  return (
    <div>
      <Nav></Nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route>
          <div>Page Not Found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
