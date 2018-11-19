import {
  VOLUNTEER_DIALOG_OPEN,
  VOLUNTEER_ACTIVITY_ON_OFF
} from "../actions/types";
import { VOLUNTEER_DIALOG_CLOSE } from "../actions/types";
import { NEW_VOLUNTEER } from "../actions/types";
import { UPDATE_VOLUNTEERS } from "../actions/types";
import { UPDATE_VOLUNTEER } from "../actions/types";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const fetchVolunteers = dispatch => {
  fetch(`http://localhost:8080/api/volunteers`, {
    headers
  })
    .then(result => result.json())
    .then(volunteers =>
      dispatch({
        type: UPDATE_VOLUNTEERS,
        payload: volunteers
      })
    );
};

export const newVolunteer = (dispatch, userData) => {
  fetch(`http://localhost:8080/api/insertvolunteer`, {
    method: "POST",
    cache: "no-cache",
    headers,
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(userData)
  })
    .then(result => result.json())
    .then(res => {
      dispatch({
        type: NEW_VOLUNTEER,
        payload: res
      });
    })
    .catch(error => {
      alert(error, "error");
    });
};

export const editVolunteer = id => dispatch => {
  // const state = getState();
  dispatch({
    type: VOLUNTEER_DIALOG_OPEN,
    payload: id
  });
};

export const updateVolunteer = (id, userData) => dispatch => {
  fetch(`http://localhost:8080/api/editvolunteer/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify(userData)
  })
    .then(result => result.json())
    .then(res => {
      dispatch({
        type: UPDATE_VOLUNTEER,
        payload: res
      });
    })
    .catch(error => {
      alert(error, "error");
    });
};

export const idCleaner = id => dispatch => {
  dispatch({
    type: VOLUNTEER_DIALOG_CLOSE,
    payload: id
  });
};

export const setVolunteerActivity = (sendstatus, id) => dispatch => {
  fetch(`http://localhost:8080/api/deactivate/${id}`, {
    method: "POST",

    cache: "no-cache",

    headers,
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(sendstatus)
  })
    .then(result => result.json())
    .then(res => {
      dispatch({
        type: VOLUNTEER_ACTIVITY_ON_OFF,
        payload: res
      });
    })
    .catch(error => {
      alert(error, "error");
    });
};
