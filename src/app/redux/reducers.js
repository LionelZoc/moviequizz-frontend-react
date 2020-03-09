import { combineReducers } from "redux";
import gameReducer from "../../ducks/game/index";
import quizzReducer from "../../ducks/quizz/index";

import appReducer from "../../ducks/app/index";

const rootReducer = combineReducers({
  game: gameReducer,
  currentQuizz: quizzReducer,
  app: appReducer
});

export default rootReducer;
