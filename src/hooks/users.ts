"use client";

import { apiRequest } from "@/lib/apiBase";
import { User } from "@/lib/types";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

export const userKeys = {
  all: ["users"],
  details: (id: string) => ["users", id],
};

const BASE_URL = "/users";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: userKeys.all,
    queryFn: () => apiRequest<User[]>(BASE_URL, "get"),
    staleTime: Infinity,
  });
};

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: userKeys.details(id),
    queryFn: () => apiRequest<User>(`${BASE_URL}/${id}`, "get"),
    staleTime: Infinity,
  });
};

export const useCreateUser = (
  mutationOptions?: UseMutationOptions<User, unknown, User>
) => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, User>({
    mutationFn: (user) => apiRequest<User, User>(BASE_URL, "post", user),
    ...mutationOptions,
    onSuccess: (data, user, params) => {
      queryClient.setQueryData<User[]>(userKeys.all, (old) => {
        if (!old) return [{ ...user, id: 1 }];
        return [...old, { ...user, id: old.length + 1 }];
      });
      mutationOptions?.onSuccess?.(data, user, params);
    },
  });
};

export const useUpdateUser = (
  mutationOptions?: UseMutationOptions<User, unknown, User>
) => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, User>({
    mutationFn: (user) =>
      apiRequest<User, User>(`${BASE_URL}/${user.id}`, "put", user),
    ...mutationOptions,
    onSuccess: (data, user, params) => {
      queryClient.setQueryData<User>(
        userKeys.details(user.id.toString()),
        data
      );
      queryClient.setQueryData<User[]>(userKeys.all, (old) => {
        if (!old) return [data];
        return old.map((u) => (u.id === user.id ? data : u));
      });
      mutationOptions?.onSuccess?.(data, user, params);
    },
  });
};

export const useDeleteUser = (
  mutationOptions?: UseMutationOptions<User, unknown, number>
) => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, number>({
    mutationFn: (id) => apiRequest<User, number>(`${BASE_URL}/${id}`, "delete"),
    ...mutationOptions,
    onSuccess: (_, id, params) => {
      queryClient.setQueryData<User[]>(userKeys.all, (old) => {
        if (!old) return [];
        return old.filter((u: any) => u.id !== id);
      });
      mutationOptions?.onSuccess?.(_, id, params);
    },
  });
};
