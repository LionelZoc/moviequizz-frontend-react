import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";

import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { green } from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { getQuizz, answerQuizz, resetQuizz } from "../ducks/quizz/actions";
import { getQuizzSelector } from "../ducks/quizz/selectors";
import { getGameSelector } from "../ducks/game/selectors";
import { getFetchResultStatusSelector } from "../ducks/app/selectors";

import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  gamePlay: {
    height: "100vh",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  root: {
    display: "flex",
    height: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 500
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%"
  }
}));

const GamePlay = ({
  history,
  quizz,
  game,
  answerQuizz,
  getQuizzStatus,
  resetQuizz
}) => {
  const classes = useStyles();

  //answerQuizz
  const onPress = choice => {
    answerQuizz({
      response: choice,
      question: _.get(quizz, "id"),
      gameId: _.get(game, "id"),
      storeAs: "answerQuizz",
      history: history
    });
  };
  // redirect to homepage when user navigate manually to this page on start
  useEffect(() => {
    //redirect to homepage when game is not started
    if (_.get(game, "finished") === true && _.get(quizz, "id") === 0) {
      history.push("/");
    }
    //redirect to score wheng game finished
    if (
      _.get(game, "finished") === true &&
      _.get(quizz, "id") !== 0 &&
      !_.isEqual(getQuizzStatus, "pending")
    ) {
      //finish game
      resetQuizz();
      history.push("/game/score");
    }
  });
  return (
    <>
      <Container maxWidth="lg" className={classes.gamePlay}>
        {_.isEqual(getQuizzStatus, "pending") && (
          <CircularProgress className={classes.loadingIndicator} />
        )}
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={_.get(quizz, "actor_poster")}
            title={_.get(quizz, "actor_name")}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Does {_.get(quizz, "actor_name")} played in{" "}
                {_.get(quizz, "movie_title", "this movie")} ?
              </Typography>
            </CardContent>

            <div className={classes.controls}>
              <IconButton
                aria-label="previous"
                onClick={() => onPress("false")}
              >
                <CancelRoundedIcon
                  style={{ color: red[500] }}
                  fontSize="large"
                />
              </IconButton>

              <IconButton aria-label="next" onClick={() => onPress("true")}>
                <FavoriteRoundedIcon
                  style={{ color: green[500] }}
                  fontSize="large"
                />
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={_.get(quizz, "movie_poster")}
            title={_.get(quizz, "movie_title")}
          />
        </Card>
        {_.isEqual(getQuizzStatus, "pending") && <LinearProgress />}
      </Container>
    </>
  );
};

GamePlay.propTypes = {
  location: PropTypes.object,
  history: PropTypes.func,
  match: PropTypes.object,
  quizz: PropTypes.object,
  game: PropTypes.object,
  getQuizz: PropTypes.func,
  resetQuizz: PropTypes.func,
  answerQuizz: PropTypes.func,
  getQuizzStatus: PropTypes.string
};

const mapStateToProps = state => {
  return {
    quizz: getQuizzSelector(state),
    game: getGameSelector(state),
    getQuizzStatus: getFetchResultStatusSelector(state, "getQuizz")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getQuizz,
      answerQuizz,
      resetQuizz
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(GamePlay);
