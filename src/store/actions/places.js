import {
  SET_PLACES,
  REMOVE_PLACE,
  PLACE_ADDED,
  START_ADD_PLACE
} from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        console.log("auth token is: ", token);
        return fetch(
          "https://us-central1-udemy-project-1549569088029.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        )
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error();
            }
          })
          .then(parsedRes => {
            console.log("parsed response is: ", parsedRes);
            const placeData = {
              name: placeName,
              location: location,
              image: parsedRes.imageUrl,
              imagePath: parsedRes.imagePath 
            };
            return fetch(
              "https://udemy-project-1549569088029.firebaseio.com/places.json?auth=" +
                authToken,
              {
                method: "POST",
                body: JSON.stringify(placeData)
              }
            )
              .then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  throw new Error();
                }
              })
              .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                dispatch(placeAdded());
                // dispatch(getPlaces()); // update places with the one just added
              })
              .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
                alert("Something went wrong, please try again.");
              });
          })
          .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
            alert("Something went wrong, please try again.");
          });
      });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          "https://udemy-project-1549569088029.firebaseio.com/places.json?auth=" +
            token
        );
      })
      .catch(() => {
        alert("No valid token found!");
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong, sorry :-/");
        console.log(err);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          "https://udemy-project-1549569088029.firebaseio.com/places/" +
            key +
            ".json?auth=" +
            token,
          {
            method: "DELETE"
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        console.log(err);
        alert("Didn't delete!  Somethings wrong...hmm.");
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
