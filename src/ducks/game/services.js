import _ from "lodash";

const apiUrl = "http://localhost:8000";

export const createGame = async params => {
  const query = _.cloneDeep(params);

  if (_.has(query, "storeAs")) delete query["storeAs"];

  try {
    let response = await fetch(`${apiUrl}/api/games/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      const result = await response.json();

      return result;
    } else {
      console.log("create game failed");

      //Sentry.captureException(response.json());
      throw new Error("Something went wrong on api server!");
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong on api server!");
  }
};

export const getGame = async params => {
  const query = _.cloneDeep(params);
  const gameId = _.get(params, "gameId");
  if (_.has(query, "storeAs")) delete query["storeAs"];

  try {
    let response = await fetch(`${apiUrl}/api/games/${gameId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      const result = await response.json();

      return result;
    } else {
      console.log("create game failed");

      throw new Error("Something went wrong on api server!");
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong on api server!");
  }
};
