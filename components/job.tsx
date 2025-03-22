'use client';

import Image from 'next/image';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HandCoins, MapPinned, Clock2Icon } from 'lucide-react';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { Job as JobType } from '@prisma/client';
import { format } from 'date-fns';
import { currencyFormatter } from '@/lib/utils';

interface Props {
  job: JobType;
}

export default function Job({ job }: Props) {
  const route = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='font-[family-name:var(--font-nunito)] p-4 border rounded-md shadow flex flex-col items-start gap-4 w-[350px] hover:cursor-pointer bg-inherit'
      onClick={() => route.push(`/job/${job.id}`)}
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
          <h3 className='font-semibold text-lg whitespace-nowrap capitalize'>
            {job.title}
          </h3>
          <h4 className='uppercase font-bold text-xs opacity-50'>
            {job.company}
          </h4>
        </div>
      </div>
      <div className='flex items-center gap-4 w-full'>
        <div className='flex items-center gap-2 opacity-50'>
          <Clock2Icon className='w-5 h-5' />
          <span className='text-sm'>{job.contract}</span>
        </div>
        <div className='flex items-center gap-2 opacity-50'>
          <HandCoins className='w-5 h-5' />
          <span className='text-sm' suppressHydrationWarning>
            {currencyFormatter(job.salary)}
          </span>
        </div>
      </div>
      <div className='flex items-center gap-4 w-full'>
        <div className='flex items-center gap-2 opacity-50'>
          <HiOutlineAdjustmentsVertical className='w-5 h-5' />
          <span className='text-sm'>{job.experienceLevel}</span>
        </div>
        <div className='flex items-center gap-2 opacity-50 text-sm'>
          <MapPinned className='w-5 h-5' />
          <span>{job.location}</span>
        </div>
      </div>

      <p className='line-clamp-3 opacity-50 text-sm h-[70px]'>
        {job.description}
      </p>
      <div className='flex items-center gap-3'>
        <Badge variant='black'>{job.tags[0]}</Badge>
        <Badge variant='black'>{job.tags[1]}</Badge>
      </div>
      <p className='text-xs opacity-50'>
        Posted on {format(job.createdAt, 'dd MMMM yyyy')}
      </p>
    </motion.div>
  );
}
