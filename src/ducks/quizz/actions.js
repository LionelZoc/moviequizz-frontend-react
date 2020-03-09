import * as actionTypes from "./actionTypes";

export const getQuizz = params => {
  return {
    type: actionTypes.GET_QUIZZ,
    payload: params
  };
};
export const getQuizzSuccess = params => {
  return {
    type: actionTypes.GET_QUIZZ_SUCCESS,
    payload: params
  };
};
export const getQuizzFailure = params => {
  return {
    type: actionTypes.GET_QUIZZ_FAILURE,
    payload: params
  };
};

export const answerQuizz = params => {
  return {
    type: actionTypes.ANSWER_QUIZZ,
    payload: params
  };
};

export const answerQuizzSuccess = params => {
  return {
    type: actionTypes.ANSWER_QUIZZ_SUCCESS,
    payload: params
  };
};
export const answerQuizzFailure = params => {
  return {
    type: actionTypes.ANSWER_QUIZZ_FAILURE,
    payload: params
  };
};

export const resetQuizz = params => {
  return {
    type: actionTypes.RESET_QUIZZ,
    payload: params
  };
};
