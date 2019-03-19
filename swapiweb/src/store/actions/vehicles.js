import { vehiclesAction } from "./actionsTypes";
import { swapiRequest } from "../../services/swapi_connect";

const fetchVehiclesStarted = () => ({
  type: vehiclesAction.FETCH_VEHICLES_STARTED
});

const fetchVehiclesSucceeded = vehicles => ({
  type: vehiclesAction.FETCH_VEHICLES_SUCCEEDED,
  vehicles
});

const fetchVehiclesFailed = error => ({
  type: vehiclesAction.FETCH_VEHICLES_FAILED,
  error
});

export const fetchVehicles = () => dispatch => {
  dispatch(fetchVehiclesStarted());

  swapiRequest(null, null, "vehicles")
    .then(response => {
      dispatch(
        fetchVehiclesSucceeded({
          results: response.results,
          total: response.count
        })
      );
    })
    .catch(error => {
      dispatch(fetchVehiclesFailed(error));
    });
};
