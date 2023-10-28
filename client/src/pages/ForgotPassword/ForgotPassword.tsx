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
// import { Loader2 } from 'lucide-react';

function ForgotPassword() {
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
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Registered email</Label>
                <Input id='email' type='email' placeholder='email' />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='code'>Code</Label>
                <Input id='code' placeholder='code' />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>New Password</Label>
                <Input id='password' type='password' placeholder='password' />
              </div>
              <Button>
                {/* <Loader2 className='mr-2 h-4 w-4 animate-spin' /> */}
                Send email
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link to='/register'>
            <Button variant='link'>Go back to login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPassword;
