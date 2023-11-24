import Cookies from "js-cookie";

export interface DataInfo {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: "Bearer";
  username?: string;
}

export class AuthService {
  static async login(data: Record<string, string>): Promise<any> {
    try {
      const res = await Http.post(`/auth/login`, {
        ...data,
      });

      this.setToken({ ...res.data, username: data.username });
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async logout() {
    try {
      this.removeToken();
    } catch (error) {
      console.log(error);
    }
  }

  static hasRefreshToken() {
    return Boolean(localStorage.getItem(REFRESH_TOKEN));
  }

  static async refreshTokens() {
    try {
      return await Http.post(`/auth/refresh-tokens`);
    } catch (error) {
      this.removeToken();
      console.log(error);
    }
  }

  static setRefreshToken(status: string) {
    if (!["", "true"].includes(status)) {
      throw new Error(
        `setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`
      );
    }

    localStorage.setItem(REFRESH_TOKEN, status);
  }

  static getToken() {
    return Cookies.get(ACCESS_TOKEN)
      ? JSON.parse(Cookies.get(ACCESS_TOKEN) || "")
      : localStorage.getItem(LOCALKEY);
  }

  static setToken(data: DataInfo) {
    const { access_token, expires_in, token_type, refresh_token } = data;

    const cookieString = JSON.stringify({ access_token, expires_in });

    expires_in > 0
      ? Cookies.set(ACCESS_TOKEN, cookieString, {
          expires: expires_in / 86400,
        })
      : Cookies.set(ACCESS_TOKEN, cookieString);

    function setLocalKey(username: string) {
      localStorage.setItem(
        LOCALKEY,
        JSON.stringify({
          expires_in,
          refresh_token,
          token_type,
          username,
        })
      );
    }

    if (data.username) {
      const { username } = data;
      setLocalKey(username);
    } else {
      const data: DataInfo = JSON.parse(localStorage.getItem(LOCALKEY) || "");
      const username = data?.username ?? "";
      setLocalKey(username);
    }
  }

  static isTokenExpired() {
    const accessTokenExpDate = this.getToken().expires_in;
    const nowTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= nowTime;
  }

  static formatToken(token: string) {
    const data: DataInfo = JSON.parse(localStorage.getItem(LOCALKEY) || "");
    const tokenType = data?.token_type ?? "Bearer";
    return `${tokenType} ${token}`;
  }

  static removeToken() {
    Cookies.remove(ACCESS_TOKEN);
    localStorage.removeItem(LOCALKEY);
  }
}
