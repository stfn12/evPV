import { PROCES_ADDED, PROCESE_FETCHED, PROCES_EDITED, PROCES_DELETED } from "../types";
import api from "../api";

export const procesAdded = (proces) => ({
  type: PROCES_ADDED,
  proces
});

export const proceseFetched = (procese) => ({
  type: PROCESE_FETCHED,
  procese
});

export const procesEdited = (proces) => ({
  type: PROCES_EDITED,
  proces
});

export const procesDeleted = () => ({
  type: PROCES_DELETED
});

export const addProces = (data) => (dispatch) =>
  api.proces.addProces(data).then(proces => dispatch(procesAdded(proces)));

export const getProcese = () => (dispatch) =>
  api.proces.getProcese().then(procese => dispatch(proceseFetched(procese)));

export const getProceseDate = (data) => (dispatch) =>
  api.proces.getProceseDate(data).then(procese => dispatch(proceseFetched(procese)));

export const getProceseName = (name) => (dispatch) =>
  api.proces.getProceseName(name).then(procese => dispatch(proceseFetched(procese)));

export const editProces = (data) => (dispatch) =>
  api.proces.editProces(data).then(proces => dispatch(procesEdited(proces)));

export const deleteProces = (data) => (dispatch) =>
  api.proces.deleteProces(data).then(dispatch(procesDeleted()));
