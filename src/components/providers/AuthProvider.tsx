import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { newToken, Token } from "@/domains/auth/token";
import { newUser, User } from "@/domains/user/entity";
import { useFindMe, useGetTokenInCache } from "@/hooks/injections";

export type AuthType = {
  isLoggedIn: boolean;
  token: Token;
  user: User;
  isFindingMeNow: boolean;
};

export const AuthContext = createContext<{
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
}>({
  auth: {} as AuthType,
  setAuth: () => {},
});

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  // cacheされたトークンをcontextに保持する
  const GetTokenInCache = useGetTokenInCache();
  const cachedToken = GetTokenInCache();

  const [auth, setAuth] = useState<AuthType>({
    isFindingMeNow: true,
    isLoggedIn: false,
    token: cachedToken,
    user: newUser(),
  });
  const authMemo: {
    auth: AuthType;
    setAuth: Dispatch<SetStateAction<AuthType>>;
  } = useMemo(() => ({ auth, setAuth }), [auth]);

  // findMe
  const findMe = async () => {
    let me = newUser();
    let isLoggedIn = true;
    const find = useFindMe();
    try {
      me = await find();
    } catch (e) {
      isLoggedIn = false;
    }
    setAuth({
      isFindingMeNow: false,
      isLoggedIn,
      token: isLoggedIn ? auth.token : newToken(),
      user: me,
    });
  };

  useEffect(() => {
    findMe();
  }, []);

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
}
