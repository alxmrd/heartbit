export const fetchVolunteers = dispatch => {
  fetch(`http://localhost:8080/api/volunteers`)
    .then(result => result.json())
    .then(volunteers =>
      dispatch({
        type: "UPDATE_VOLUNTEERS",
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
        type: "NEW_VOLUNTEER",
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
    type: "EDIT",
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
        type: "UPDATE",
        payload: res
      });
    })
    .catch(error => {
      alert(error, "error");
    });
};
