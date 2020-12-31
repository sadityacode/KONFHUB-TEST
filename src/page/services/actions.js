import * as types from "./types";

/**
 *
 * Store/Reset/Remove data dynamically based on .
 * @param {Object} payload - API response on success/error/loading
 * @param {String} type - type for sucess/error/loading
 */

export const onConferenceSuccess = (
  payload = null,
  type = types.SUCCESS_CONFERENCE
) => {
  return {
    type,
    payload
  };
};

export const isConferenceLoading = (
  payload = null,
  type = types.LOADING_CONFERENCE
) => {
  return {
    type,
    payload
  };
};

export const onConferenceError = (
  payload = null,
  type = types.ERROR_CONFERENCE
) => {
  return {
    type,
    payload
  };
};
