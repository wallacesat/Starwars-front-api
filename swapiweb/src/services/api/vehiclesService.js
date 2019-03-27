import { httpService } from "./httpService";

export function getVehicles(page) {
  return page
    ? process.env.NODE_ENV === "development"
      ? httpService.get(`/vehicles/page=${page}`)
      : httpService.get(`/vehicles/?page=${page}`)
    : httpService.get("/vehicles");
}
