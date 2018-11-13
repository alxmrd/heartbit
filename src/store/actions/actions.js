import { VOLUNTEER_DIALOG_OPEN } from "../actions/types";
import { VOLUNTEER_DIALOG_CLOSE } from "../actions/types";
import { NEW_VOLUNTEER } from "../actions/types";
import { UPDATE_VOLUNTEERS } from "../actions/types";
import { UPDATE_VOLUNTEER } from "../actions/types";

export const fetchVolunteers = dispatch => {
  fetch(`http://localhost:8080/api/volunteers`)
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
    mode: "cors",
    cache: "no-cache",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
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
    mode: "cors",
    cache: "no-cache",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    redirect: "follow",
    referrer: "no-referrer",
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
