'use client';

import Image from 'next/image';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HandCoins, MapPinned, Clock2Icon } from 'lucide-react';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';

export default function Job() {
  const route = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='font-[family-name:var(--font-nunito)] p-4 border rounded-md shadow flex flex-col items-start gap-4 w-[350px] hover:cursor-pointer bg-inherit'
      onClick={() => route.push(`/job/1`)}
    >
      <div className='flex items-center gap-4'>
        <Image
          src={'/Job.png'}
          alt='Card Banner Image'
          width={60}
          height={60}
          className='rounded-md object-cover object-center'
        />
        <div className='flex flex-col items-start gap-0'>
          <h3 className='font-semibold text-lg whitespace-nowrap'>
            Frontend Developer
          </h3>
          <h4 className='uppercase font-bold text-xs opacity-50'>behance</h4>
        </div>
      </div>
      <div className='flex items-center gap-2 opacity-50 text-sm'>
        <MapPinned className='w-5 h-5' />
        <span>Remote</span>
      </div>
      <div className='flex items-center gap-4 justify-between w-full'>
        <div className='flex items-center gap-2 opacity-50'>
          <HiOutlineAdjustmentsVertical className='w-5 h-5' />
          <span className='text-sm'>Senior</span>
        </div>
        <div className='flex items-center gap-2 opacity-50'>
          <Clock2Icon className='w-5 h-5' />
          <span className='text-sm'>Full-Time</span>
        </div>
        <div className='flex items-center gap-2 opacity-50'>
          <HandCoins className='w-5 h-5' />
          <span className='text-sm'>R 50 000.00</span>
        </div>
      </div>
      <p className='line-clamp-3 opacity-50 text-sm'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
        eligendi saepe ad fuga, debitis tenetur deleniti quaerat alias
        reiciendis assumenda ipsa sit dicta dolore pariatur qui magnam
        accusantium praesentium aliquam! Cumque veritatis, aliquam ut
        repellendus sunt quis delectus laborum ducimus nobis aut vero in rem cum
        dolorum exercitationem deserunt, praesentium reprehenderit aperiam
        minima, nam hic blanditiis nihil maiores unde. Aspernatur! Dignissimos
        iure voluptatem reiciendis eum, aliquam provident!
      </p>
      <div className='flex items-center gap-x-4 gap-y-2 flex-wrap'>
        <Badge variant='black'>Development</Badge>
        <Badge variant='black'>Design</Badge>
        <Badge variant='black'>Senior</Badge>
        <Badge variant='black'>Full-Time</Badge>
      </div>
      <p className='text-xs opacity-50'>Posted on 11 January 2025</p>
    </motion.div>
  );
}
