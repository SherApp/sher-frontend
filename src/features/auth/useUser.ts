import { useEffect, useState } from 'react';
import { User } from '@sherapp/sher-shared/auth';
import { getUser } from './apiCalls';

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, []);

  return { user };
};
