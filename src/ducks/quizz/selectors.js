import _ from "lodash";
import { createSelector } from "reselect";

const getQuizz = state => _.get(state, "currentQuizz", {});

export const getQuizzSelector = createSelector(getQuizz, quizz => quizz);
