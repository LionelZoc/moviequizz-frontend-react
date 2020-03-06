import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import GameHome from "../../components/GameHomePage";
import GamePlay from "../../components/GamePlay";
import GameScore from "../../components/GameScore";

const history = createHistory();
const Base = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={GameHome} />
        <Route path="/game/play" component={GamePlay} />
        <Route path="/game/score" component={GameScore} />
      </Switch>
    </Router>
  );
};

export default Base;
