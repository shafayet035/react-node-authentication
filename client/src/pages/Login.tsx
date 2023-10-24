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
import { Loader2 } from 'lucide-react';

function Login() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px] h-max'>
        <CardHeader className='text-center'>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='Your email address' />
              </div>
              <div className='flex flex-col space-y-1.5 mb-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' placeholder='Your password' />
              </div>
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button variant='link'>Create an account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
