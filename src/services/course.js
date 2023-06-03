import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/courses`;

// http.setContentType('application/json');

export function getCourses() {
  return http.get(`${apiEndpoint}/`);
}

export function getCourse(courseId) {
  return http.get(`${apiEndpoint}/${courseId}`);
}

export function saveCourse(course) {
  return http.post(apiEndpoint, course);
}

export function updateCourse(course) {
  return http.put(`${apiEndpoint}/${course.id}`, course);
}

export function deleteCourse(courseId) {
  return http.delete(`${apiEndpoint}/${courseId}`);
}

export function filterCourses(query) {
  return http.get(`${apiEndpoint}/search?${query}`);
}
