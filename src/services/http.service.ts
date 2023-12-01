import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
const router = useRouter();

class HttpRequest {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;

  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: "https://js-post-api.herokuapp.com/api",
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    });

    // this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        const whiteList = ["/login", "/forgot-password"];
        return whiteList.some((v) => config.url!.indexOf(v) > -1)
          ? config
          : new Promise((resolve) => {
              const data = AuthService.getToken();
              if (data) {
                if (AuthService.isTokenExpired()) {
                  if (!this.isRefreshing) {
                    this.isRefreshing = true;
                    AuthService.refreshTokens()
                      .then((res) => {
                        const token = res?.data.accessToken;
                        config.headers!["Authorization"] = AuthService.formatToken(token);
                      })
                      .finally(() => {
                        this.isRefreshing = false;
                      });
                  }
                  // resolve(this.retryOriginalRequest(config));
                } else {
                  config.headers!["Authorization"] = AuthService.formatToken(
                    data.access_token
                  );
                  resolve(config);
                }
              } else {
                resolve(config);
              }
            });
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const modifiedResponse: AxiosResponse = {
          ...response,
          data: {
            success: true,
            data: response.data,
          },
        };
        return modifiedResponse;
      },
      (error) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);

        const status = error?.response?.status;

        switch (status) {
          case 500: {
            router.push(ROUTE.UNEXPECTED_ERROR_PATH);
            break;
          }
          case 422: {
            break;
          }
          case 404: {
            router.push(ROUTE.NOT_FOUND_PATH);
            break;
          }
          case 403: {
            router.push(ROUTE.FORBIDDEN_ERROR_PATH);
            break;
          }
          case 503: {
            router.push(ROUTE.MAINTENANCE_PATH);
            break;
          }
          case 401: {
            AuthService.logout();
            break;
          }
          default: {
            break;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get(url, config)
      .then((response) => response.data);
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .post(url, data, config)
      .then((response) => response.data);
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .put(url, data, config)
      .then((response) => response.data);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete(url, config)
      .then((response) => response.data);
  }
}

export const Http = new HttpRequest();
