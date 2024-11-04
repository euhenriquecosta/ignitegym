import { API_BASE_URL } from "@env";

import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Define o timeout para 1 minuto (60000 ms)
  timeoutErrorMessage: "A requisição demorou muito para responder. Tente novamente mais tarde.", // Mensagem personalizada de timeout
});

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message));
  } else {
    return Promise.reject(new AppError(error.message || "Erro no servidor. Tente novamente mais tarde."));
  }
})
export { api }