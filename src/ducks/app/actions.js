import * as actionTypes from "./actionTypes";
//action
export const setRequestStatus = ({ id, status }) => ({
  type: actionTypes.UPDATE_REQUEST_STATUS,
  payload: { id: id, status: status }
});
