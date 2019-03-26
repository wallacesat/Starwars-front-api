import { vehiclesAction } from "./actionsTypes";
import { getVehicles } from "../../services/api/vehiclesService";

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

  getVehicles()
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        fetchVehiclesSucceeded({
          results,
          page,
          pageCount
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
  getVehicles(page)
    .then(response => {
      const { results, page, pageCount } = response;
      dispatch(
        updateVehiclesSucceeded({
          results,
          page,
          pageCount
        })
      );
    })
    .catch(error => {
      dispatch(updateVehiclesFailed(error));
    });
};
