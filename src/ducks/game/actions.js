import * as actionTypes from "./actionTypes";

export const createGame = params => {
  return {
    type: actionTypes.CREATE_GAME,
    payload: params
  };
};
export const createGameSuccess = params => {
  return {
    type: actionTypes.CREATE_GAME_SUCCESS,
    payload: params
  };
};
export const createGameFailure = params => {
  return {
    type: actionTypes.CREATE_GAME_FAILURE,
    payload: params
  };
};
export const resetGame = params => {
  return {
    type: actionTypes.RESET_GAME,
    payload: params
  };
};
export const getGame = params => {
  return {
    type: actionTypes.GET_GAME,
    payload: params
  };
};

export const getGameSuccess = params => {
  return {
    type: actionTypes.GET_GAME_SUCCESS,
    payload: params
  };
};
export const getGameFailure = params => {
  return {
    type: actionTypes.GET_GAME_FAILURE,
    payload: params
  };
};
