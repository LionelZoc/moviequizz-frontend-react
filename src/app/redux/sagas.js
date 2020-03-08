import { all } from "redux-saga/effects";
import { sagas as gameSagas } from "../../ducks/game";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([gameSagas()]);
}
