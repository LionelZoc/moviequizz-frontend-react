import React from "react";
import PropTypes from "prop-types";
import logo from "../logo.svg";
import Button from "@material-ui/core/Button";

const HomePage = ({ match, location, history }) => {
  const onStart = () => {
    history.push("/game/play");
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Press start to start a new game.</p>
          <Button variant="contained" color="primary" onClick={onStart}>
            Start
          </Button>
        </header>
      </div>
    </>
  );
};

HomePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.func,
  match: PropTypes.object
};
export default HomePage;
