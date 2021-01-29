import React from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MediaList from "./components/MediaList";
import MediaView from "./components/MediaView/MediaView";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/title/:id" component={MediaView} />
          <Route exact path="/:pageNum" component={MediaList} />
          <Redirect to="/1" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
