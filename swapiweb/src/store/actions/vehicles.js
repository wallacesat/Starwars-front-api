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
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(fetchVehiclesFailed(error));
    });
};

const updateVehiclesIsFetching = () => ({
  type: vehiclesAction.UPDATE_VEHICLES_IS_FETCHING
});

const updateVehiclesSucceeded = vehicles => ({
  type: vehiclesAction.UPDATE_VEHICLES_SUCCEEDED,
  vehicles
});

const updateVehiclesFailed = error => ({
  type: vehiclesAction.UPDATE_VEHICLES_FAILED,
  error
});

export const updateVehicles = page => dispatch => {
  dispatch(updateVehiclesIsFetching());
  swapiRequest(null, page, "vehicles")
    .then(response => {
      dispatch(
        updateVehiclesSucceeded({
          results: response.results,
          page: response.page,
          pageCount: response.pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updateVehiclesFailed(error));
    });
};
