import { createSelector } from "reselect";
import { PROCES_ADDED, PROCES_EDITED, PROCESE_FETCHED } from "../types";

export default function procese(state = {}, action = {}) {
  switch (action.type) {
    case PROCES_ADDED:
      return action.proces;
    case PROCESE_FETCHED:
      return action.procese;
    case PROCES_EDITED:
      return action.proces;
    default:
      return state;
  }
}
//
export const proceseSelector = state => state.procese;

export const allProceseSelector = createSelector(
  proceseSelector,
  proceseHash => Object.values(proceseHash)
);
