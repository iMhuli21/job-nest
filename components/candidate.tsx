import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import CandidateDropdownMenu from './candidateDropdownmenu';

export default function Candidate() {
  return (
    <Card>
      <CardContent className='space-y-4'>
        <div className='flex items-start gap-4'>
          <div className='flex items-center gap-4 flex-1'>
            <Image
              src={'/avatar-trans.png'}
              alt='candidate avatar'
              width={40}
              height={40}
              className='object-cover object-center'
            />
            <div className='flex flex-col items-start gap-0'>
              <h4 className='text-base font-semibold'>John Doe</h4>
              <span className='opacity-50 text-xs'>Frontend Developer</span>
            </div>
          </div>
          <CandidateDropdownMenu />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h5 className='font-medium opacity-60'>Contact Info</h5>
          <p className='text-sm opacity-50'>Email: johndoe@gmail.com</p>
          <p className='text-sm opacity-50'>Phone Number: +27123456789</p>
        </div>
      </CardContent>
    </Card>
  );
}
