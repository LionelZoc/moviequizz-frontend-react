import createCachedSelector from "re-reselect";
import _ from "lodash";

const getFetchResultStatus = state => _.get(state, "app.requests_status", {});
export const getFetchResultStatusSelector = createCachedSelector(
  getFetchResultStatus,
  (state, id) => id,
  (status, id) => {
    if (!_.isEmpty(id) && !_.isEmpty(status) && !_.isEmpty(status[id])) {
      return status[id];
    }

    return "success";
  }
)((state, id) => `fetch_status_${id}`);
