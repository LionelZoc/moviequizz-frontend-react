import { call, put, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as quizzActions from "../quizz/actions";
import * as services from "./services";
import * as appActions from "../app/actions";
import _ from "lodash";

function* createGame(action) {
  try {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "pending"
      })
    );

    const result = yield call(services.createGame, action.payload);

    yield put(
      actions.createGameSuccess({
        game: result
      })
    );
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "success"
      })
    );
    yield put(
      quizzActions.getQuizz({
        storeAs: "getQuizz",
        history: action.payload.history,
        gameId: _.get(result, "id")
      })
    );
    if (_.has(action, "payload.history")) {
      action.payload.history.push("/game/play");
    }
  } catch (e) {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "error"
      })
    );
  }
}

// }
function* getGame(action) {
  try {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "pending"
      })
    );

    const result = yield call(services.getGame, action.payload);

    yield put(
      actions.getGameSuccess({
        game: result
      })
    );

    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "success"
      })
    );
  } catch (e) {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "error"
      })
    );
  }
}

export default function*() {
  yield all([
    yield takeLatest(actionTypes.CREATE_GAME, createGame),
    yield takeLatest(actionTypes.GET_GAME, getGame)
  ]);
}
