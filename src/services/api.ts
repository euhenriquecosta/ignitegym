import { API_BASE_URL } from "@env";

import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave} from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSucess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerIntereptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://192.168.100.120:3333',
  timeout: 60000,
  timeoutErrorMessage: "A requisição demorou muito para responder. Tente novamente mais tarde.",
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing: boolean = false;

api.registerIntereptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet()
        isRefreshing = true;

        const originalRequestConfig = requestError.config;
        
        if (isRefreshing) {
          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', { refresh_token });

              await storageAuthTokenSave(data.token, data.refresh_token);

              if(originalRequestConfig.data) {
                originalRequestConfig.data = JSON.stringify(originalRequestConfig.data);
              }
              
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
              originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };

              failedQueue.forEach(request => {
                request.onSucess(data.token);
              });

              console.log("TOKEN ATUALIZADO!");

              resolve(api(originalRequestConfig));
            } catch(error: any) {
              console.log(error);
              failedQueue.forEach(request => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
            failedQueue.push({
              onSucess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            })
          })
        }

      }

      signOut();
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(new AppError(requestError.message || "Erro no servidor. Tente novamente mais tarde."));
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}


export { api }