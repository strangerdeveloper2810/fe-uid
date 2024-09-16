import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  // createProductStart,
  // createProductSuccess,
  // createProductFailure,
} from "../../slice/productsSlice";
import http from "../../../utils/setting";
import { GET_ALL_PRODUCT_API } from "../../types/sagaTypes";

function* getAllProduct(): SagaIterator {
  yield put(fetchProductsStart());
  try {
    const response = yield call(() => http.get("/product"));

    if (_.isEmpty(response.data)) {
      yield put(fetchProductsFailure("No products found"));
    } else {
      yield put(fetchProductsSuccess(response.data));
    }
  } catch (error) {
    yield put(fetchProductsFailure("Failed to fetch products"));
    console.log(error);
  }
}

// function* createProduct(action) {
//   try {
//     const response = yield call(createProductApi, action.payload);
//     yield put(createProductSuccess(response.data));
//   } catch (error) {
//     yield put(createProductFailure("Failed to create product"));
//   }
// }

export default function* productsSaga() {
  yield takeLatest(GET_ALL_PRODUCT_API, getAllProduct);
  //   yield takeLatest(createProductStart.type, createProduct);
}
