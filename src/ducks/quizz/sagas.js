import { call, put, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as gameActions from "../game/actions";
import * as services from "./services";
import * as appActions from "../app/actions";
import _ from "lodash";
function* getQuizz(action) {
  try {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "pending"
      })
    );

    const result = yield call(services.getQuizz, action.payload);

    yield put(
      actions.getQuizzSuccess({
        quizz: result
      })
    );
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "success"
      })
    );
  } catch (e) {
    console.log(e);
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "error"
      })
    );
  }
}

// }
function* answerQuizz(action) {
  try {
    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "pending"
      })
    );

    const result = yield call(services.answerQuizz, action.payload);
    console.log("answerQuizz", result);


    yield put(
      appActions.setRequestStatus({
        id: action.payload.storeAs,
        status: "success"
      })
    );

//update game
    yield put(
      gameActions.updateGame({
        game: result
      })
    );
//fetch new quizz
    yield put(
      actions.getQuizz({storeAs:"getQuizz", history: action.payload.history, gameId: _.get(result, "id")})
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
    yield takeLatest(actionTypes.GET_QUIZZ, getQuizz),
    yield takeLatest(actionTypes.ANSWER_QUIZZ, answerQuizz)
  ]);
}
