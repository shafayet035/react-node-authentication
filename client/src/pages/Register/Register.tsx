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
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/config/axios';

import { RegisterSchemaType, registerSchema } from './validation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

function Register() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const defaultValues: RegisterSchemaType = {
    name: '',
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterSchemaType) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/register', values);
      toast({
        description: data.message,
      });
      setLoading(false);
      navigate('/login');
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
        <CardHeader className='text-center'>
          <CardTitle>Sign up</CardTitle>
          {error && <span className='text-red-500 text-sm '>{error}</span>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='full name'
                  {...register('name')}
                />
                {errors.name?.message && (
                  <span className='text-red-500 text-sm'>
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='email address'
                  type='email'
                  {...register('email')}
                />
                {errors.email?.message && (
                  <span className='text-red-500 text-sm'>
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col space-y-1.5 mb-1'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  placeholder='password'
                  type='password'
                  {...register('password')}
                />
                {errors.password?.message && (
                  <span className='text-red-500 text-sm'>
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <Button type='submit'>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Register
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link to='/login'>
            <Button variant='link'>Already have an account</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Register;
