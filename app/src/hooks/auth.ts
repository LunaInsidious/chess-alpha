import { useContext } from "react";

import { AuthContext } from "@/components/providers/AuthProvider";

export const useAuth = () => useContext(AuthContext);
