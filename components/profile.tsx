import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Profile() {
  return (
    <div className='px-2 space-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <h3 className='text-xl font-medium'>Edit Profile</h3>
        <span className='opacity-50 font-medium text-sm'>
          Keep your information up to date.
        </span>
      </div>
      <div className='max-w-[900px] w-full flex flex-col items-start gap-7'>
        <div className='w-full border-2 border-dashed rounded-md flex items-center justify-center p-4 h-40 hover:cursor-pointer bg-muted/20'>
          <span className='opacity-50'>
            Drag your file or click here to upload your cv.
          </span>
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
          <h4>Contact Number</h4>
          <Input placeholder='+27123456789' />
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
          <h4>Full Name</h4>
          <Input placeholder='John Doe' />
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
          <h4>Email</h4>
          <Input placeholder='johndoe@gmail.com' />
        </div>
        <div className='flex flex-col items-start gap-2 w-full'>
          <h4>Job Title</h4>
          <Input placeholder='Frontend Developer' />
        </div>
        <Button variant={'yellow'}>Save Changes</Button>
      </div>
    </div>
  );
}
