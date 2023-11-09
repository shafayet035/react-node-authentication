import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className='container p-4 flex justify-between items-center'>
      <h3>Secret Message</h3>

      <div className='flex gap-3'>
        <Link to='/'>
          <Button variant='ghost'>Home</Button>
        </Link>

        <Link to='/create'>
          <Button variant='outline'>Create message</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
