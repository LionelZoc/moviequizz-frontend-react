import _ from "lodash";
import { createSelector } from "reselect";

const getGame = state => _.get(state, "game", {});

export const getGameSelector = createSelector(getGame, game => game);
