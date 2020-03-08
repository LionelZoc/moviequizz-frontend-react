import { combineReducers } from "redux";
import gameReducer from "../../ducks/game/index";

import appReducer from "../../ducks/app/index";
const initialState = {
  game: {
    score: 50,
    id: "gameId",
    finished: false
  },
  currentQuizz: {
    id: 4,
    moviePoster:
      "https://image.tmdb.org/t/p/original/qZ1KAgfdeNbzrNYKW4BIRHdEBJ9.jpg",
    movieTitle: "Dragon heart",
    actorPoster:
      "https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg",
    actorName: "Cho Yeo-jeong"
  },
  requestStatus: {}
};

const quizzReducer = (state = initialState.currentQuizz, action) => {
  switch (action.type) {
    case "setQuizz":

    default:
      return state;
  }
};

// const requestStatusReducer = (state, action) => {
//   switch (action.type) {
//     case "setQuizz":
//
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  game: gameReducer,
  currentQuizz: quizzReducer,
  app: appReducer
});

//export default persistedReducer;
export default rootReducer;
