import { newUser } from "@/domains/user/entity";
import { useAuth } from "@/hooks/auth";
import { useFindMe } from "@/hooks/injections";

export const useFindMeHook = (): {
  findMe: () => Promise<void>;
} => {
  const { setAuth } = useAuth();
  const findMe = async () => {
    setAuth((prev) => ({ ...prev, isFindingMeNow: true }));
    let me = newUser();
    let isLoggedIn = true;
    const find = useFindMe();
    try {
      me = await find();
    } catch (e) {
      isLoggedIn = false;
    }
    setAuth((prev) => ({
      isFindingMeNow: false,
      isLoggedIn,
      token: prev.token,
      user: me,
    }));
  };

  return {
    findMe,
  };
};
