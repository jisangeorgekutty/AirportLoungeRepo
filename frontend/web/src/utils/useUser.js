import * as React from 'react';
import { useSession } from '@hono/auth-js/react';

const useUser = () => {
  const { data: session, status } = useSession();
  const id = session?.user?.id;

  const [user, setUser] = React.useState(session?.user ?? null);

  const fetchUser = React.useCallback(async (currSession) => {
    return currSession?.user;
  }, []);

  const refetchUser = React.useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      if (id) {
        fetchUser(session).then(setUser);
      } else {
        setUser(null);
      }
    }
  }, [fetchUser, id, session]);

  React.useEffect(refetchUser, [refetchUser]);

  if (process.env.NODE_ENV !== 'production') {
    return {
      user,
      data: session?.user || null,
      loading: status === 'loading',
      refetch: refetchUser,
    };
  }

  return {
    user,
    data: user,
    loading: status === 'loading' || (status === 'authenticated' && !user),
    refetch: refetchUser,
  };
};

export { useUser };
export default useUser;