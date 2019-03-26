import { httpService } from "./httpService";

export function getPeople(page) {
  return page
    ? httpService.get(`/people/page=${page}`)
    : httpService.get("/people");
}
