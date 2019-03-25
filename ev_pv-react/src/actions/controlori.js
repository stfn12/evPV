import { CONTROLOR_ADDED, CONTROLOR_FETCHED, CONTROLOR_EDITED, CONTROLOR_DELETED } from "../types";
import api from "../api";

export const controlorAdded = (controlor) => ({
  type: CONTROLOR_ADDED,
  controlor
});

export const controlorFetched = (controlori) => ({
  type: CONTROLOR_FETCHED,
  controlori
});

export const controlorEdited = (controlor) => ({
  type: CONTROLOR_EDITED,
  controlor
});

export const controlorDeleted = () => ({
  type: CONTROLOR_DELETED
});

export const addControlor = (data) => (dispatch) =>
  api.controlor.addControlor(data).then(controlor => dispatch(controlorAdded(controlor)));

export const getControlori = () => (dispatch) =>
  api.controlor.getControlori().then(controlori => dispatch(controlorFetched(controlori)));

export const editControlor = (data) => (dispatch) =>
  api.controlor.editControlor(data).then(controlor => dispatch(controlorEdited(controlor)));

export const deleteControlor = (id) => (dispatch) =>
  api.controlor.deleteControlor(id).then(dispatch(controlorDeleted()));
