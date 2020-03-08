import * as actionTypes from "./actionTypes";

//import _ from "lodash";

export const handleRequestStatusReducer = (state, action) => {
  return {
    ...state,
    requests_status: {
      ...state.requests_status,
      [action.payload.id]: action.payload.status
    }
  };
};

const initialState = {
  requests_status: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_REQUEST_STATUS:
      return handleRequestStatusReducer(state, action);
    default:
      return state;
  }
}
