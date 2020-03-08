import _ from "lodash";

const apiUrl = "http://localhost:8000";

export const getQuizz = async params => {
  if (!_.has(params, "gameId") && !_.isEmpty(_.get(params, "gameId"))) {
    throw new Error("please provide the gameId!");
  }
  const gameId = _.get(params, "gameId");
  try {
    let response = await fetch(`${apiUrl}/api/games/${gameId}/play`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      const result = await response.json();

      return result;
    } else {
      console.log("failed to get quizz");

      throw new Error("Something went wrong on api server!");
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong on api server!");
  }
};

export const answerQuizz = async params => {
  const gameId = _.get(params, "gameId");

  const body = {
    response: _.get(params, "response"),
    question: _.get(params, "question")
  };

  try {
    let response = await fetch(`${apiUrl}/api/games/${gameId}/play`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.status === 200) {
      const result = await response.json();

      return result;
    }
    if (response.status === 403) {
      console.log("failed to answer quizz");

      throw new Error("this game is already finished");
    } else {
      console.log("failed to answer quizz");

      throw new Error("Something went wrong on api server!");
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong on api server!");
  }
};
