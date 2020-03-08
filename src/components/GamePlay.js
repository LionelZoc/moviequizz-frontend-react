import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import _ from "lodash";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { green } from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";
import { bindActionCreators, compose } from "redux";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  gamePlay:{
    marginTop: 100,
    height: 500,
    backgroundColor:"black"
  },

  root: {
    display: "flex",
    borderColor:"red",
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
    justifyContent:"space-between",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const GamePlay = ({ match, location, history , quizz}) => {
  const classes = useStyles();
  const theme = useTheme();

  const onPress = ({ value }) => {
    console.log("user respond", value);
    history.push("/game/score");
  };
  return (
    <>
      <Container maxWidth="sm" className={classes.gamePlay}>
        <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={_.get(quizz, "actorPoster")}
          title={_.get(quizz, "actorName")}
        />
          <div className={classes.details}>

            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Does {_.get(quizz, "actorName")}  played in {_.get(quizz, "movieTitle", "this movie")} ?
              </Typography>

            </CardContent>

            <div className={classes.controls}>
              <IconButton aria-label="previous" onClick={onPress}>
                <CancelRoundedIcon style={{ color: red[500] }} fontSize="large" />
              </IconButton>

              <IconButton aria-label="next" onClick={onPress}>
                <FavoriteRoundedIcon style={{ color: green[500] }} fontSize="large" />
              </IconButton>
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={_.get(quizz, "moviePoster")}
            title={_.get(quizz, "movieTitle")}
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
  responseStatus:PropTypes.string
};

const mapStateToProps = state => {
// return{
//   game:getGame(state)
// }
return{
  quizz:
    {
      id: 4,
 moviePoster: "https://image.tmdb.org/t/p/original/qZ1KAgfdeNbzrNYKW4BIRHdEBJ9.jpg",
 movieTitle: "Dragon heart",
 actorPoster: "https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg",
 actorName: "Cho Yeo-jeong"
    }
  ,
  responseStatus: "pending"
};
};

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       createGame
//     },
//     dispatch
//   );

export default compose(
  connect(
    mapStateToProps,
    //mapDispatchToProps
  )
)(GamePlay);
