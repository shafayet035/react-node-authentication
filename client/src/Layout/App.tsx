import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import { useUser } from '@/hooks/useUser';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Create from '@/pages/Create';

function App() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <Authenticated />
      ) : (
        <>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </>
      )}
      <Toaster />
    </>
  );
}

function Authenticated() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<h2> Hello Wolrd </h2>} />
        <Route path='/create' element={<Create />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
