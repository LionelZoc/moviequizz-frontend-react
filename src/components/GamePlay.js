import React, {useEffect} from "react";
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
import { getQuizz, answerQuizz } from "../ducks/quizz/actions";
import { getQuizzSelector } from "../ducks/quizz/selectors";
import { getGameSelector } from "../ducks/game/selectors";
import {getFetchResultStatusSelector} from "../ducks/app/selectors";

const useStyles = makeStyles(theme => ({
  gamePlay: {
    marginTop: 100,
    height: 500,
    backgroundColor: "black"
  },

  root: {
    display: "flex",
    borderColor: "red",
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
    width: 400
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
  }
}));

const GamePlay = ({  history, quizz, game, answerQuizz, getQuizzStatus }) => {
  const classes = useStyles();


  const onPress = choice => {
    answerQuizz({
      response: choice,
      question: _.get(quizz, "id"),
      gameId: _.get(game, "id"),
      storeAs: "answerQuizz",
      history: history
    });
  };
  //fetch a quizz when game is created or redirect to homepage when user navigate manually to this page on start
  useEffect(()=>{
    if(_.get(game, "finished") === true && _.get(quizz, "id") === 0){
      history.push("/");
    }
    if(_.get(game, "finished") === true && _.get(quizz, "id") !== 0 && !_.isEqual(getQuizzStatus, "pending")){
      //getQuizz({storeAs:"getQuizz", history: history, gameId: _.get(game, "id")});
      history.push("/game/score");
    }
  });
  return (
    <>
      <Container maxWidth="sm" className={classes.gamePlay}>
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
              <IconButton aria-label="previous" onClick={() => onPress("false")}>
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
      </Container>
    </>
  );
};

GamePlay.propTypes = {
  location: PropTypes.object,
  history: PropTypes.func,
  match: PropTypes.object,
  quizz: PropTypes.object,
  responseStatus: PropTypes.string,
  game: PropTypes.object,
  getQuizz: PropTypes.func,
  answerQuizz : PropTypes.func,
  getQuizzStatus: PropTypes.string
};

const mapStateToProps = state => {
  return {
    quizz: getQuizzSelector(state),
    game: getGameSelector(state),
    responseStatus: getFetchResultStatusSelector(state, "answerQuizz"),
    getQuizzStatus: getFetchResultStatusSelector(state, "getQuizz")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getQuizz,
      answerQuizz
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(GamePlay);
