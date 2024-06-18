import { UserAPI } from "@/usecases/ports/user";

export const findMe = async (deps: { api: UserAPI }) => deps.api.findMe();
