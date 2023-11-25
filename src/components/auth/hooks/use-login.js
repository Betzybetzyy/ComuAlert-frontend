import { useMutation, useQueryClient } from 'react-query';
import { login, register } from '../mutations/auth-mutation';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => login(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
    });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => register(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('register');
    },
    });
};