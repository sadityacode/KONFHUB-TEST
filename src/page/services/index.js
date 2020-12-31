import FetchUtils from "../../utils/FetchUtils";

// import actions
import {
  onConferenceSuccess,
  isConferenceLoading,
  onConferenceError
} from "./actions";

const getConferenceList = () => async dispatch => {
  const URL = `https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences`;

  // start loading
  dispatch(
    isConferenceLoading({
      isLoading: true
    })
  );

  const response = await FetchUtils.getData(URL, "get conferences data");

  if (response.success && response.data) {
    //dispatch data list on success
    dispatch(
      onConferenceSuccess({
        conferenceData: response.data.data
      })
    );

    dispatch(
      onConferenceError({
        isError: false
      })
    );
    // stop loading
    dispatch(
      isConferenceLoading({
        isLoading: false
      })
    );
  } else {
    // stop loading
    dispatch(
      isConferenceLoading({
        isLoading: false
      })
    );

    dispatch(
      onConferenceError({
        isError: true
      })
    );
  }

  return response.data;
};

export { getConferenceList };
