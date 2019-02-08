import { SET_PLACES, REMOVE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      "https://us-central1-udemy-project-1549569088029.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
        alert("Something went wrong, please try again.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch(
          "https://udemy-project-1549569088029.firebaseio.com/places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
        alert("Something went wrong, please try again.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        // dispatch(getPlaces()); // update places with the one just added
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    return fetch(
      "https://udemy-project-1549569088029.firebaseio.com/places.json"
    )
      .catch(err => {
        alert("Something went wrong, sorry :-/");
        console.log(err);
      })
      .then(res => res.json())
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
    dispatch(removePlace(key));
    fetch(
      "https://udemy-project-1549569088029.firebaseio.com/places/" +
        key +
        ".json",
      {
        method: "DELETE"
      }
    )
      .catch(err => {
        console.log(err);
        alert("Didn't delete!  Somethings wrong...hmm.");
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("Done!");
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
}