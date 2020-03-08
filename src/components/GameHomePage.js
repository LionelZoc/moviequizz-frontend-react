import React from "react";
import PropTypes from "prop-types";
import logo from "../logo.svg";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { createGame } from "../ducks/game/actions";
import { getGameSelector } from "../ducks/game/selectors";
import { getFetchResultStatusSelector } from "../ducks/app/selectors";

const useStyles = makeStyles( () => ({
  root: {
    display: "flex"
  },
  cover: {
    width: 151
  },
  grid: {
    display: "flex"
  }
}));
const HomePage = ({  history, createGame }) => {
  const classes = useStyles();
  const onStart = () => {
    createGame({ history: history, storeAs: "createGame" });
  };
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <CardMedia component="img" src={logo} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
          <p>Press start to start a new game.</p>
          <Button variant="contained" color="primary" onClick={onStart}>
            Start
          </Button>
        </Grid>
      </Container>
    </>
  );
};

HomePage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.func,
  match: PropTypes.object,
  game: PropTypes.object,
  createGame: PropTypes.func
};

const mapStateToProps = state => {
  return {
    game: getGameSelector(state),
    createStatus: getFetchResultStatusSelector(state, "createGame")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createGame
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(HomePage);
