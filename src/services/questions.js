import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/questions`;

// http.setContentType('application/json');

export function getQuestions() {
  return http.get(`${apiEndpoint}/`);
}

export function getQuestion(questionId) {
  return http.get(`${apiEndpoint}/${questionId}`);
}

export function saveQuestion(question) {
  return http.post(apiEndpoint, question);
}

export function updateQuestion(question) {
  return http.put(`${apiEndpoint}/${question.id}`, question);
}

export function deleteQuestion(questionId) {
  return http.delete(`${apiEndpoint}/${questionId}`);
}

// export function filterExams(query) {
//   return http.get(`${apiEndpoint}/${query}`);
// }
