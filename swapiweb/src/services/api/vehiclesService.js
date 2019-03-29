import { httpService } from "./httpService";

export function getVehicles(page) {
  return page
    ? httpService.get(`/vehicles/page=${page}`)
    : httpService.get("/vehicles");
}
