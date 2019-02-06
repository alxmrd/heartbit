export const PostData = (type, userData) => {
  let url = `${process.env.REACT_APP_URL}/api/${type}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      //credentials: 'include',
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        //"Content-Type": "application/json; charset=utf-8"
        "Content-Type": "application/x-www-form-urlencoded"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(userData) // body data type must match "Content-Type" header
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        // console.log(userData);
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
  });
};
