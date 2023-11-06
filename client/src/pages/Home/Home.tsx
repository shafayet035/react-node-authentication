import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { toast } = useToast();

  const { setUser, user } = useUser();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.post('/auth/logout');
    toast({
      description: 'Logged out successfully',
    });
    localStorage.removeItem('access_token');
    navigate('/login');
    setUser(null);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h3 className='mb-4'> Welcome {user?.name}</h3>
      <p className='mb-4'>Your Email is : {user?.email}</p>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Home;
