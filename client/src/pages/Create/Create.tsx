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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@radix-ui/react-label';

const Create = () => {
  return (
    <div className='container'>
      <Card className='max-w-[350px]'>
        <CardHeader>
          <CardTitle>New message</CardTitle>
          <CardDescription>
            Create and share your secret message with your, well you know who to
            share 😛
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-5'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='title'>Message title</Label>
              <Input id='title' placeholder='Enter message title' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                placeholder='Your Secret message'
                rows={5}
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='reply' />
              <label
                htmlFor='reply'
                className='text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Allow reply to your message
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Create;
