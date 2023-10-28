import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h3 className='mb-4'> Welcome to the home page!</h3>
      <Button>Logout</Button>
    </div>
  );
};

export default Home;
