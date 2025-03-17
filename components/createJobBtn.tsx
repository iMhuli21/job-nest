import Link from 'next/link';
import { Button } from './ui/button';
import { PenLine } from 'lucide-react';

export default function CreateJobBtn() {
  return (
    <div className='fixed z-50 bottom-10 right-7'>
      <Button asChild size={'icon'} className='rounded-full h-12 w-12'>
        <Link href={'/job/create'}>
          <PenLine className='size-10' />
        </Link>
      </Button>
    </div>
  );
}
