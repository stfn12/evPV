import { CONTROLOR_ADDED, CONTROLOR_EDITED, CONTROLOR_FETCHED } from "../types";

export default function procese(state = {}, action = {}) {
  switch (action.type) {
    case CONTROLOR_ADDED:
      return action.controlor;
    case CONTROLOR_FETCHED:
      return action.controlori;
    case CONTROLOR_EDITED:
      return action.controlor;
    default:
      return state;
  }
}
