import { DIALOG_OPEN, VOLUNTEER_ACTIVITY_ON_OFF } from "../actions/types";
import { DIALOG_CLOSE } from "../actions/types";
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
import { UPDATE_DEFIBRILLATOR } from "../actions/types";
import { CLEAN_DEFIBRILLATOR_DATA } from "../actions/types";
import { NEW_PATIENT } from "../actions/types";
import { CLEAN_PATIENT_DATA } from "../actions/types";
import { UPDATE_PATIENT } from "../actions/types";
import { NEW_ADMIN } from "../actions/types";
import { CLEAN_ADMIN_DATA } from "../actions/types";
import { LOGGED_IN_ADMIN } from "../actions/types";
import { UPDATE_ADMIN } from "../actions/types";
import { STORE_ARDUINO_DATA } from "../actions/types";
import { ARDUINO_DATA_CLEANER } from "../actions/types";
import history from "../../history";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + sessionStorage.getItem("token")
};

export const fetchVolunteers = dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/volunteers`, {
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
      history.push("/");
    });
};

export const fetchDefifrillators = dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/defibrillators`, {
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
      history.push("/");
    });
};
export const changeDefibrillatorFlag = defibrillatorData => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/defibrillator/presentflag`, {
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
  fetch(`${process.env.REACT_APP_URL}/api/defibrillator/locker`, {
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
export const changeDefibrillatorLockerByArduino = defibrillatorData => dispatch => {
  dispatch({
    type: CHANGE_DEFIBRILLATOR_LOCKER,
    payload: defibrillatorData
  });
};
export const changeDefibrillatorPresentFlagByArduino = defibrillatorData => dispatch => {
  dispatch({
    type: CHANGE_DEFIBRILLATOR_FLAG,
    payload: defibrillatorData
  });
};
export const storeArduinoData = data => dispatch => {
  dispatch({
    type: STORE_ARDUINO_DATA,
    payload: data
  });
};
export const clearArduinoData = data => dispatch => {
  dispatch({
    type: ARDUINO_DATA_CLEANER,
    payload: data
  });
};
export const fetchAdmin = dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/admin`, {
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
      history.push("/");
    });
};

export const fetchEvents = dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/event`, {
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
      history.push("/");
    });
};
export const sendMessage = sendData => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/sendMessage`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(sendData)
  });
};

export const fetchPatients = dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/patients`, {
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
      history.push("/");
    });
};

export const newVolunteer = (dispatch, userData) => {
  fetch(`${process.env.REACT_APP_URL}/api/insertvolunteer`, {
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

export const successLogin = ({ username }) => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/login/success?input=${username}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },

    referrer: "no-referrer"
  })
    .then(result => result.json())
    .then(res => {
      dispatch({
        type: LOGGED_IN_ADMIN,
        payload: res
      });
    })

    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};
// export const successLogin = successfullData => dispatch => {
//   // const state = getState();
//   dispatch({
//     type: LOGGED_IN_ADMIN,
//     payload: successfullData
//   });
// };

export const newPatient = (dispatch, userData) => {
  fetch(`${process.env.REACT_APP_URL}/api/insertpatient`, {
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
            type: NEW_PATIENT,
            payload: res
          });
    })

    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};
export const newAdmin = (dispatch, adminData) => {
  fetch(`${process.env.REACT_APP_URL}/api/insertadmin`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(adminData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: NEW_ADMIN,
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

export const clearDefibrillatorData = defibrillatorData => dispatch => {
  dispatch({
    type: CLEAN_DEFIBRILLATOR_DATA,
    payload: defibrillatorData
  });
};
export const clearPatientData = patientData => dispatch => {
  dispatch({
    type: CLEAN_PATIENT_DATA,
    payload: patientData
  });
};
export const clearAdminData = adminData => dispatch => {
  dispatch({
    type: CLEAN_ADMIN_DATA,
    payload: adminData
  });
};

export const editVolunteer = id => dispatch => {
  // const state = getState();
  dispatch({
    type: DIALOG_OPEN,
    payload: id
  });
};
export const editAdmin = id => dispatch => {
  // const state = getState();
  dispatch({
    type: DIALOG_OPEN,
    payload: id
  });
};
export const editDefibrillator = id => dispatch => {
  // const state = getState();
  dispatch({
    type: DIALOG_OPEN,
    payload: id
  });
};
export const editPatient = id => dispatch => {
  // const state = getState();
  dispatch({
    type: DIALOG_OPEN,
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
  fetch(`${process.env.REACT_APP_URL}/api/editvolunteer/${id}`, {
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

export const updateAdmin = (id, adminData) => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/editadmin/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify(adminData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: UPDATE_ADMIN,
            payload: res
          });
    })
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};
export const updatePatient = (id, patientData) => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/editpatient/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify(patientData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: UPDATE_PATIENT,
            payload: res
          });
    })
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const updateDefibrillator = defibrillatorData => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/editdefibrillator`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + sessionStorage.getItem("token")
    },
    body: JSON.stringify(defibrillatorData)
  })
    .then(result => result.json())
    .then(res => {
      res.httpstatus === "error"
        ? dispatch({
            type: ISINVALID,
            payload: res
          })
        : dispatch({
            type: UPDATE_DEFIBRILLATOR,
            payload: res
          });
    })
    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};

export const idCleaner = id => dispatch => {
  dispatch({
    type: DIALOG_CLOSE,
    payload: id
  });
};

export const setVolunteerActivity = (sendstatus, id) => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/deactivate/${id}`, {
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
export const sendEvent = datapoustelnw => {
  return async dispatch => {
    try {
      await fetch(`${process.env.REACT_APP_URL}/api/insertevent`, {
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

      fetch(`${process.env.REACT_APP_URL}/api/sendEvent`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          ...headers,
          Authorization: "Bearer " + sessionStorage.getItem("token")
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(datapoustelnw)
      });
    } catch (e) {
      dispatch({
        type: ISINVALID,
        payload: e
      });
    }
  };
};
export const insertEventClick = datapoustelnw => dispatch => {
  fetch(`${process.env.REACT_APP_URL}/api/insertevent`, {
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
  fetch(`${process.env.REACT_APP_URL}/api/insertdefibrillator`, {
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
  fetch(`${process.env.REACT_APP_URL}/api/volunteer/search?input=${searched}`, {
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
