import { all, fork } from "redux-saga/effects";
import productsSaga from "./productSaga";

export default function* rootSaga() {
  yield all([fork(productsSaga)]);
}
