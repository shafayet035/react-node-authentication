import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchemaType, loginSchema } from './validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import axios from '@/config/axios';
import { useUser } from '@/hooks/useUser';

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [error, setError] = useState('');

  const defaultValues: LoginSchemaType = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginSchemaType) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/login', values);
      toast({
        description: data.message,
      });
      setLoading(false);
      navigate('/');
      setUser(data.data);
      localStorage.setItem('access_token', data.data.token);
    } catch (error) {
      const err = error as any;
      if (err?.response?.data?.message) {
        toast({
          variant: 'destructive',
          description: err?.response?.data?.message,
        });
        setError(err?.response?.data?.message);
      } else {
        toast({
          variant: 'destructive',
          description: 'Something went wrong!',
        });
      }
      setLoading(false);
      new Error(err);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px] h-max'>
        <CardHeader className='text-center '>
          <CardTitle>Sign in</CardTitle>
          {error && <span className='text-red-500 text-sm '>{error}</span>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Your email address'
                  {...register('email')}
                />
                {errors.email?.message && (
                  <span className='text-red-500 text-sm'>
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col space-y-1.5 mb-1 relative'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Your password'
                  {...register('password')}
                />
                {showPassword ? (
                  <Eye
                    className='h-4 w-4 absolute right-3 top-7 cursor-pointer'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className='h-4 w-4 absolute right-3 top-7 cursor-pointer'
                    onClick={() => setShowPassword(true)}
                  />
                )}

                {errors.password?.message && (
                  <span className='text-red-500 text-sm'>
                    {errors.password?.message}
                  </span>
                )}
              </div>

              <Button disabled={loading}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link to='/register'>
            <Button variant='link'>Create an account</Button>
          </Link>
          <Link to='/forgot-password'>
            <Button variant='link'>Forgot password?</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
