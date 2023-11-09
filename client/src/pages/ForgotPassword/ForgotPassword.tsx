import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Loader2, RocketIcon } from 'lucide-react';
import { useState } from 'react';
import useForgotPassword from './useForgotPassword';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResetPasswordType, resetPasswordSchema } from './validation';
import { zodResolver } from '@hookform/resolvers/zod';

function ForgotPassword() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { loading, sendVerificationCode, resetPassword } = useForgotPassword();

  const defaultValues: ResetPasswordType = {
    email: '',
    code: '',
    password: '',
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const sendCodehandler = async () => {
    const result = await sendVerificationCode({ email: getValues('email') });
    if (result) setIsEmailSent(true);
  };

  const resetPasswordHandler = async (values: ResetPasswordType) => {
    await resetPassword(values);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px] h-max'>
        <CardHeader className='text-center'>
          <CardTitle className='mb-3'>Recover your password</CardTitle>
          <CardDescription>
            Enter your registered email address to receive recovery code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            {isEmailSent && (
              <Alert className='border-teal-200 caret-teal-100'>
                <RocketIcon className='h-4' />
                <AlertDescription>
                  Code Sent to {getValues('email')}
                </AlertDescription>
              </Alert>
            )}
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Registered email</Label>
              <Input
                id='email'
                type='email'
                placeholder='email'
                readOnly={isEmailSent}
                {...register('email')}
              />
            </div>
            {!isEmailSent && (
              <Button onClick={sendCodehandler}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Send code to email
              </Button>
            )}
            {isEmailSent && (
              <>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='code'>Code</Label>
                  <Input id='code' placeholder='code' {...register('code')} />
                  {errors.code?.message && (
                    <span className='text-red-500 text-sm'>
                      {errors.code.message}
                    </span>
                  )}
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password'>New Password</Label>
                  <Input
                    id='password'
                    type='password'
                    placeholder='password'
                    {...register('password')}
                  />
                  {errors.password?.message && (
                    <span className='text-red-500 text-sm'>
                      {errors.password?.message}
                    </span>
                  )}
                </div>
                <Button onClick={handleSubmit(resetPasswordHandler)}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Reset password
                </Button>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link to='/login'>
            <Button variant='link'>Go back to login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPassword;
