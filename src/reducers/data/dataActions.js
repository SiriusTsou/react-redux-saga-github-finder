// 引入 actionTypes 常數
import ActionTypes from '../../lib/constants' ;

/**
 * ## GetGithubData actions
 */

export const getGithubInitiate = () => ({
  type: ActionTypes.GET_GITHUB_INITIATE,
});

export const getGithubSuccess = (json) => ({
  type: ActionTypes.GET_GITHUB_SUCCESS,
  payload: {
    data: json,
  },
});

export const getGithubFail = () => ({
  type: ActionTypes.GET_GITHUB_FAIL,
});

export const getGithub = (userId:string) => ({
  type: ActionTypes.GET_GITHUB_START, // redux-saga actions
  payload: {
    userId,
  },
});

// 同步 actions 處理，回傳 action 物件
export const changeUserId = (text) => ({
  type: ActionTypes.CHAGE_USER_ID,
  payload: {
    userId: text,
  }, 
});


export const onChangeUserId = (event) => (
  changeUserId(event.target.value)
);

export const onSubmitUserId = (userId) => (
  getGithub(userId)
);
