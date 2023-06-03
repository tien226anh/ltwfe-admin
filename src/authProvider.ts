import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8000";
const httpClient = fetchUtils.fetchJson;

export const authProvider = {
  login: ({ username, password }) => {
    const credentials = { username, password };
    const request = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    return httpClient(`${apiUrl}/login`, request)
      .then(({ json }) => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("role", json.role);
      })
      .catch(() => {
        throw new Error("Login failed");
      });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => {
    const role = localStorage.getItem("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
