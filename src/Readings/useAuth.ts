import { Credentials } from '../Account/types';
import { useQuery } from '@tanstack/react-query';
import { DX_2_ENDPOINT_PROPS } from './endpoints';

const AUTH_STALE_TIME_IN_MILLISECONDS = 45 * 60 * 1000;

export function useAuth(credentials: Credentials | undefined) {
  const authResponse = useQuery({
    queryKey: [DX_2_ENDPOINT_PROPS.auth, credentials],
    queryFn: async () => {
      const authEndpointProps = DX_2_ENDPOINT_PROPS.auth;
      const { method, headers, bodyBase, bodySchema } = authEndpointProps;
      const body = bodySchema.parse({
        ...bodyBase,
        ...credentials,
      });

      const authResponse = await fetch(authEndpointProps.url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      return (await authResponse.json()) as string;
    },
    enabled:
      Boolean(credentials?.accountName) && Boolean(credentials?.password),
    staleTime: AUTH_STALE_TIME_IN_MILLISECONDS,
    refetchInterval: AUTH_STALE_TIME_IN_MILLISECONDS,
  });
  const {
    data: authToken,
    isSuccess: isAuthSuccess,
    isError: isAuthError,
  } = authResponse;

  return {
    authResponse,
    authToken,
    isAuthSuccess,
    isAuthError,
  };
}
