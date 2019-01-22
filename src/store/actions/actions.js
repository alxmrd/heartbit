import {
  VOLUNTEER_DIALOG_OPEN,
  VOLUNTEER_ACTIVITY_ON_OFF
} from "../actions/types";
import { VOLUNTEER_DIALOG_CLOSE } from "../actions/types";
import { NEW_VOLUNTEER } from "../actions/types";
import { UPDATE_VOLUNTEERS } from "../actions/types";
import { UPDATE_VOLUNTEER } from "../actions/types";
import { INSERT_EVENT } from "../actions/types";
import { SELECT_PLACE } from "../actions/types";
import { FETCH_DEFIBRILLATORS } from "../actions/types";
import { FETCH_EVENTS } from "../actions/types";
import { FETCH_PATIENTS } from "../actions/types";
import { FETCH_ADMIN } from "../actions/types";
import { ISINVALID } from "../actions/types";
import { CLEAR_ISINVALID } from "../actions/types";
import { CLEAN_VOLUNTEER_DATA } from "../actions/types";
import { SEARCH_VOLUNTEER } from "../actions/types";
import { CLEAR_SELECT_PLACE } from "../actions/types";
import { CLEAR_SUCCESS_MESSAGE } from "../actions/types";
import { INSERT_DEFIBRILLATOR } from "../actions/types";
import { CHANGE_DEFIBRILLATOR_FLAG } from "../actions/types";
import { CHANGE_DEFIBRILLATOR_LOCKER } from "../actions/types";
import { DEF_DATA_CLEANER } from "../actions/types";
import { DEF_DATA_KEEPER } from "../actions/types";

import history from "../../history";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("token")
};

export const fetchVolunteers = dispatch => {
  fetch(`http://localhost:8080/api/volunteers`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  })
    .then(result => result.json())

    .then(volunteers =>
      dispatch({
        type: UPDATE_VOLUNTEERS,
        payload: volunteers.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      history.push("/login");
    });
};

export const fetchDefifrillators = dispatch => {
  fetch(`http://localhost:8080/api/defibrillators`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  })
    .then(result => result.json())

    .then(defibrillators =>
      dispatch({
        type: FETCH_DEFIBRILLATORS,
        payload: defibrillators.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      history.push("/login");
    });
};
export const changeDefibrillatorFlag = defibrillatorData => dispatch => {
  fetch(`http://localhost:8080/api/defibrillator/presentflag`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(defibrillatorData)
  })
    .then(result => result.json())

    .then(res =>
      dispatch({
        type: CHANGE_DEFIBRILLATOR_FLAG,
        payload: res
      })
    )
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const changeDefibrillatorLocker = defibrillatorData => dispatch => {
  fetch(`http://localhost:8080/api/defibrillator/locker`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(defibrillatorData)
  })
    .then(result => result.json())

    .then(res =>
      dispatch({
        type: CHANGE_DEFIBRILLATOR_LOCKER,
        payload: res
      })
    )
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const fetchAdmin = dispatch => {
  fetch(`http://localhost:8080//api/admin`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  })
    .then(result => result.json())

    .then(admin =>
      dispatch({
        type: FETCH_ADMIN,
        payload: admin.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      history.push("/login");
    });
};

export const fetchEvents = dispatch => {
  fetch(`http://localhost:8080//api/event`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  })
    .then(result => result.json())

    .then(events =>
      dispatch({
        type: FETCH_EVENTS,
        payload: events.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      history.push("/login");
    });
};

export const fetchPatients = dispatch => {
  fetch(`http://localhost:8080//api/patients`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    }
  })
    .then(result => result.json())

    .then(patients =>
      dispatch({
        type: FETCH_PATIENTS,
        payload: patients.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      history.push("/login");
    });
};

export const newVolunteer = (dispatch, userData) => {
  fetch(`http://localhost:8080/api/insertvolunteer`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(userData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: NEW_VOLUNTEER,
            payload: res
          });
    })

    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const errorMessageCleaner = errormessage => dispatch => {
  dispatch({
    type: CLEAR_ISINVALID,
    payload: errormessage
  });
};

export const successMessageCleaner = successmessage => dispatch => {
  dispatch({
    type: CLEAR_SUCCESS_MESSAGE,
    payload: successmessage
  });
};

export const clearVolunteerData = volunteerData => dispatch => {
  dispatch({
    type: CLEAN_VOLUNTEER_DATA,
    payload: volunteerData
  });
};

export const editVolunteer = id => dispatch => {
  // const state = getState();
  dispatch({
    type: VOLUNTEER_DIALOG_OPEN,
    payload: id
  });
};

export const lockerClick = defibrillatorData => dispatch => {
  // const state = getState();
  dispatch({
    type: DEF_DATA_KEEPER,
    payload: defibrillatorData
  });
};
export const flagClick = defibrillatorData => dispatch => {
  // const state = getState();
  dispatch({
    type: DEF_DATA_KEEPER,
    payload: defibrillatorData
  });
};

export const SnackClose = defibrillatorData => dispatch => {
  // const state = getState();
  dispatch({
    type: DEF_DATA_CLEANER,
    payload: defibrillatorData
  });
};

export const updateVolunteer = (id, userData) => dispatch => {
  fetch(`http://localhost:8080/api/editvolunteer/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify(userData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: UPDATE_VOLUNTEER,
            payload: res
          });
    })
    .catch(error => {
      alert(error, "SERVER error 500 ");
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

    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
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
      alert("Απαιτείται σύνδεση");
      alert(error, "error");
    });
};

export const insertEventClick = datapoustelnw => dispatch => {
  fetch(`http://localhost:8080/api/insertevent`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(datapoustelnw)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({ type: INSERT_EVENT, payload: res });
    })
    .catch(error => error.json())
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const insertDefibrillatorClick = datapoustelnw => dispatch => {
  fetch(`http://localhost:8080/api/insertdefibrillator`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(datapoustelnw)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({ type: INSERT_DEFIBRILLATOR, payload: res });
    })
    .catch(error => error.json())
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};
export const SearchOnVolunteers = ({ searched }) => dispatch => {
  fetch(`http://localhost:8080/api/volunteer/search?input=${searched}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer"
    // body: JSON.stringify(searched)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({ type: SEARCH_VOLUNTEER, payload: res });
    })

    .catch(error => error.json())
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const selectPlace = datapoustelnw => dispatch => {
  dispatch({
    type: SELECT_PLACE,
    payload: datapoustelnw
  });
};

export const clearSelectedPlace = selectedPlace => dispatch => {
  dispatch({
    type: CLEAR_SELECT_PLACE,
    payload: selectPlace
  });
};
