import { vehiclesAction } from "./actionsTypes";
import { getVehicles } from "../../services/api/vehiclesService";
import { handleResulstWithId } from "../../utils/handleResultsWithId";

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

  return getVehicles()
    .then(response => {
      const { results, count } = response;
      dispatch(
        fetchVehiclesSucceeded({
          page: 1,
          results: handleResulstWithId(results, 1),
          pageCount: Math.ceil(count / 10)
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
  return getVehicles(page)
    .then(response => {
      const { results, count } = response;
      dispatch(
        updateVehiclesSucceeded({
          page,
          results: handleResulstWithId(results, page),
          pageCount: Math.ceil(count / 10)
        })
      );
    })
    .catch(error => {
      dispatch(updateVehiclesFailed(error));
    });
};
