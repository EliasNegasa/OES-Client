import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/enrollments`;

// http.setContentType('application/json');

export function getEnrollments() {
  return http.get(`${apiEndpoint}/`);
}

export function getEnrollment(enrollmentId) {
  return http.get(`${apiEndpoint}/${enrollmentId}`);
}

export function saveEnrollment(enrollment) {
  return http.post(apiEndpoint, enrollment);
}

export function updateEnrollment(enrollment) {
  return http.put(`${apiEndpoint}/${enrollment.id}`, enrollment);
}

export function deleteEnrollment(enrollmentId) {
  return http.delete(`${apiEndpoint}/${enrollmentId}`);
}

export function filterEnrollments(query) {
  return http.get(`${apiEndpoint}/search?${query}`);
}
