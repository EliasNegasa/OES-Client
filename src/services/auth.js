import JwtDecode from "jwt-decode";
import http from "./http";
import { apiUrl } from "../../config.json";

const apiEndpoint = `${apiUrl}/auth/signin`;
const tokenKey = "token";

http.setJwt(getToken());

export const login = async ({ email, password }) => {
  const { data } = await http.post(apiEndpoint, {
    email: email,
    password: password,
  });
  console.log("LOG", data);
  localStorage.setItem(tokenKey, data.accessToken);
};

export function logout() {
  localStorage.removeItem(tokenKey);
}

// export function loginWithJwt(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

export function getCurrentUser() {
  try {
    const accessToken = localStorage.getItem(tokenKey);
    return JwtDecode(accessToken);
  } catch (error) {
    return null;
  }
}

function getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
};
