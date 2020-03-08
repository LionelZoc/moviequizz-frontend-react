import * as actionTypes from "./actionTypes";
import _ from "lodash";

const initialState = {
  score: 0,
  id: "",
  finished: true
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME_SUCCESS:
      return _.get(action, "payload.game");
    case actionTypes.UPDATE_GAME:
        return _.get(action, "payload.game");
    case actionTypes.RESET_GAME:
      return initialState;
    case actionTypes.GET_GAME_SUCCESS:
      return _.get(action, "payload.game");
    default:
      return state;
  }
};

export default gameReducer;
