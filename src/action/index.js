import { INITIALIZE_MAP, SET_DATA_FEATURES, SET_FILTERED_FEATURES } from "../constant/mapAction";

export function initializeMap(payload) {
  return { type: INITIALIZE_MAP, payload };
}

export function setDataFeatures(payload) {
  return { type: SET_DATA_FEATURES, payload };
}

export function setFilteredFeatures(payload) {
  return { type: SET_FILTERED_FEATURES, payload };
}