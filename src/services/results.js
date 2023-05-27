import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/results`;

// http.setContentType('application/json');

export function getResults() {
  return http.get(`${apiEndpoint}/`);
}

export function getResult(resultId) {
  return http.get(`${apiEndpoint}/${resultId}`);
}

export function saveResult(result) {
  return http.post(apiEndpoint, result);
}

export function updateResult(result) {
  return http.put(`${apiEndpoint}/${result.id}`, result);
}

export function deleteResult(resultId) {
  return http.delete(`${apiEndpoint}/${resultId}`);
}

// export function filterResults(query) {
//   return http.get(`${apiEndpoint}/${query}`);
// }
