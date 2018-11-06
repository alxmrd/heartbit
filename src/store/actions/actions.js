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

export const NewVolunteer = (dispatch, userData) => {
  console.log(userData);
  console.log("action called");
  fetch(`http://localhost:8080/api/insert`, {
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
    .then(() => {
      console.log("dispatch");
      dispatch({
        type: "NEW_VOLUNTEER",
        payload: userData
      });
    })
    .catch(error => {
      console.log(error, "error");
    });
};
