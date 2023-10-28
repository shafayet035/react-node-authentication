import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from '@/config/axios';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(null);

  const navigate = useNavigate();

  const verifyUser = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return navigate('/login');
    }
    try {
      const { data } = await axios.get('/verify/user');
      if (data.isAuthorized) setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem('access_token');
      navigate('/login');
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : children}
    </UserContext.Provider>
  );
};
