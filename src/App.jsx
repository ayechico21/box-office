import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
function App() {
  return (
    <div>
      <Nav></Nav>
      <Switch>
        <Route exact path="/">
          This is home page
        </Route>
        <Route exact path="/starred">
          This is starred
        </Route>
        <Route>this is 404 page</Route>
      </Switch>
    </div>
  );
}

export default App;
