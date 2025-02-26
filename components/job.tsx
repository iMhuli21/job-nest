import Image from 'next/image';
import { Building2, MapPin, HandCoins } from 'lucide-react';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';

export default function Job() {
  return (
    <div className='font-[family-name:var(--font-nunito)] p-4 w-[250px] flex flex-col items-center justify-center gap-4 hover:cursor-pointer hover:bg-muted rounded-md hover:transition-colors hover:duration-250 hover:ease-in-out'>
      <Image
        src={'/Job.png'}
        alt='Job banner'
        width={220}
        height={220}
        priority
        className='object-cover object-center rounded-md'
      />
      <div className='w-full flex flex-col items-start gap-2'>
        <h3 className='text-lg font-semibold opacity-90'>Backend Developer</h3>
        <div className='flex items-center gap-2 opacity-70'>
          <Building2 className='size-5' />
          <span className='text-sm'>ABC Company</span>
        </div>
        <div className='flex items-center gap-2 opacity-70'>
          <HiOutlineAdjustmentsVertical className='size-5' />
          <span className='text-sm'>Senior</span>
        </div>
        <div className='flex items-center gap-2 opacity-70'>
          <MapPin className='size-5' />
          <span className='text-sm'>Remote</span>
        </div>
        <div className='flex items-center gap-2 opacity-70'>
          <HandCoins className='size-5' />
          <span className='text-sm'>R50k</span>
        </div>
      </div>
    </div>
  );
}
