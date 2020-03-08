import * as actionTypes from "./actionTypes";
import _ from "lodash";

// const initialState = {
//   id: 0,
//   moviePoster:
//     "https://image.tmdb.org/t/p/original/qZ1KAgfdeNbzrNYKW4BIRHdEBJ9.jpg",
//   movieTitle: "Dragon heart",
//   actorPoster:
//     "https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg",
//   actorName: "Cho Yeo-jeong"
// };
const initialState = {
  id: 0,
  movie_poster:
    "",
  movie_title: "",
  actor_poster:
    "",
  actor_name: ""
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_QUIZZ_SUCCESS:
    //return the new quizz or the previous state if nothing is found
      return _.get(action, "payload.quizz", state);
    default:
      return state;
  }
};

export default gameReducer;
