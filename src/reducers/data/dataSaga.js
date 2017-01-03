import { call, fork, take, put } from 'redux-saga/effects';
import * as dataActions from './dataActions';
import * as uiActions from '../ui/uiActions';
import ApiFactory from '../../api/apiFactory';
import ActionTypes from '../../lib/constants';

const api = new ApiFactory();

export function* getGithubData(payload) {
  try {
    yield put(dataActions.getGithubInitiate());
    yield put(uiActions.showSpinner());
    // user is a promise backed from firebase
    const data = yield call([api, api.getUserData], payload.userId);

    yield put(dataActions.getGithubSuccess(data));
    yield put(uiActions.hideSpinner());
    // Actions.Main()
  } catch (error) {
    yield put(dataActions.getGithubFail());
  }
}

/**
 * Watchers
 */

export function* watchGetGithubData() {
  while (true) {
    const { payload } = yield take(ActionTypes.GET_GITHUB_START);
    yield fork(getGithubData, payload);
  }
}

export default [
  fork(watchGetGithubData),
];
