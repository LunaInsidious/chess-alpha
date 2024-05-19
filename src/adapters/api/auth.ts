import axios from "axios";
import Cookies from "js-cookie";

import { Token, newToken } from "@/domains/auth/entity";
import { validateAuthInfo } from "@/domains/auth/validation";
import { Auth } from "@/usecases/ports/auth";

export const cookiesKey = "AuthInfo";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const saveAuthInfoToCookie = (key: string, authInfo: Token) => {
  Cookies.set(key, encodeURIComponent(JSON.stringify(authInfo)));
};

export const setTokenToHeader = (authInfo: Token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${authInfo.accessToken}`;
};

export function useAuthDriverForAxios(): Auth {
  return {
    saveAuthInfo(authInfo: Token) {
      setTokenToHeader(authInfo);
      saveAuthInfoToCookie(cookiesKey, authInfo);
    },
    getAuthInfo(): Token {
      const cookie = decodeURIComponent(<string>Cookies.get(cookiesKey));
      if (cookie == null) {
        this.resetAuthInfo();
        return newToken();
      }
      try {
        const auth = JSON.parse(cookie);
        if (!validateAuthInfo(auth)) {
          this.resetAuthInfo();
          return newToken();
        }
        return auth;
      } catch (e) {
        this.resetAuthInfo();
        return newToken();
      }
    },
    resetAuthInfo(): void {
      setTokenToHeader(newToken());
      Cookies.remove(cookiesKey);
    },
  };
}
