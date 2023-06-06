import http from "./http";
import { apiUrl, limit } from "../../config.json";

const apiEndpoint = `${apiUrl}/api/answers`;

// http.setContentType('application/json');

export function getAnswers() {
  return http.get(`${apiEndpoint}/`);
}

export function getAnswer(answerId) {
  return http.get(`${apiEndpoint}/${answerId}`);
}

export function saveAnswer(answer) {
  return http.post(apiEndpoint, answer);
}

export function updateAnswer(answer) {
  return http.put(`${apiEndpoint}/${answer.id}`, answer);
}

export function deleteAnswer(answerId) {
  return http.delete(`${apiEndpoint}/${answerId}`);
}

// export function filterExams(query) {
//   return http.get(`${apiEndpoint}/${query}`);
// }
