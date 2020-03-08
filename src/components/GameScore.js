import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import _ from "lodash";
import { makeStyles} from "@material-ui/core/styles";


import Typography from "@material-ui/core/Typography";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { createGame } from "../ducks/game/actions";
import { getGameSelector } from "../ducks/game/selectors";
import { getFetchResultStatusSelector } from "../ducks/app/selectors";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 100,
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const GameScore = ({

  history,
  game,
  createGame
}) => {
  const classes = useStyles();

  const restart = () => {
    createGame({ history: history, storeAs: "createGame" });
  };
  return (
    <>
      <Container maxWidth="sm">
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Your score is {_.get(game, "score")}!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="large" color="primary" onClick={restart}>
              Play again
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

GameScore.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  createGame: PropTypes.func,
  game: PropTypes.object,
  createStatus: PropTypes.string
};

const mapStateToProps = state => {
  // return{
  //   game:getGame(state)
  // }
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(GameScore);
