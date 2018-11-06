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

export const NewVolunteer = dispatch => {
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
      console.log("res", res);
      dispatch({
        type: "NEW_VOLUNTEER",
        payload: res
      });
    })
    .catch(error => {
      console.log(error, "error");
    });
};
