import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export default function Account() {
  return (
    <div className='px-2 space-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <h3 className='text-xl font-medium'>Account</h3>
        <span className='opacity-50 font-medium text-sm'>
          Make changes to your account.
        </span>
      </div>
      <div>
        <div className='flex flex-col items-start gap-2'>
          <h4>Delete Account</h4>
          <p className='opacity-50'>
            By initiating this action your related data including your job posts
            will all be deleted. This action is irrevisable.
          </p>
          <Button className='flex items-center mt-3' variant='destructive'>
            <Trash2 />
            <span>Delete Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
