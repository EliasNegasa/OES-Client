import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/users`;

// http.setContentType('application/json');

export function getUsers() {
  return http.get(`${apiEndpoint}/`);
}

export function getUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export function saveUser(user) {
  return http.post(apiEndpoint, user);
}

export function updateUser(user) {
  return http.put(`${apiEndpoint}/${user.id}`, user);
}

export function deleteUser(userId) {
  return http.delete(`${apiEndpoint}/${userId}`);
}

// export function filterUsers(query) {
//   return http.get(`${apiEndpoint}/${query}`);
// }
