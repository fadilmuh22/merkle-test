import { apiRequest } from "@/lib/apiBase";
import { SessionData, SessionPayload } from "@/lib/session";
import { LoginPayload, LoginToken } from "@/lib/types";
import { UseMutationOptions, useMutation, useQuery } from "react-query";

const SessionQueryKey = "session";

const BASE_URL = "/auth";

export function useSession() {
  const session = useQuery<SessionData>({
    queryKey: SessionQueryKey,
    queryFn: () => apiRequest<SessionData>(BASE_URL, "get", undefined, true),
  });

  const login = useMutation<SessionData, unknown, SessionPayload>({
    mutationFn: (payload) =>
      apiRequest<SessionData, SessionPayload>(BASE_URL, "post", payload, true),
  });

  const logout = useMutation<SessionData, unknown>({
    mutationFn: () =>
      apiRequest<SessionData>(BASE_URL, "delete", undefined, true),
  });

  return { session, login, logout };
}

export const useLogin = (
  mutationOptions?: UseMutationOptions<LoginToken, unknown, LoginPayload>
) => {
  const { login } = useSession();
  return useMutation<LoginToken, unknown, LoginPayload>({
    mutationFn: (payload) =>
      apiRequest<LoginToken, LoginPayload>(
        `${BASE_URL}/login`,
        "post",
        payload
      ),
    ...mutationOptions,
    onSuccess: async (data, user, params) => {
      await login.mutateAsync({ ...user, ...data });
      mutationOptions?.onSuccess?.(data, user, params);
    },
  });
};
