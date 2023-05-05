import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/exams`;

// http.setContentType('application/json');

export function getExams() {
  return http.get(`${apiEndpoint}/`);
}

export function getExam(examId) {
  return http.get(`${apiEndpoint}/${examId}`);
}

export function saveExam(exam) {
  return http.post(apiEndpoint, exam);
}

export function updateExam(exam) {
  return http.put(`${apiEndpoint}/${exam.id}`, exam);
}

export function deleteExam(examId) {
  return http.delete(`${apiEndpoint}/${examId}`);
}

// export function filterExams(query) {
//   return http.get(`${apiEndpoint}/${query}`);
// }
