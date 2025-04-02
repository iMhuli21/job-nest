'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from './ui/badge';
import { Job } from '@prisma/client';
import { motion } from 'framer-motion';
import JobDropdownMenu from './jobDropdownmenu';
import { currencyFormatter } from '@/lib/utils';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { HandCoins, MapPinned, Clock2Icon } from 'lucide-react';

interface Props {
  job: Job;
}

export default function UserJob({ job }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='font-[family-name:var(--font-nunito)] p-4 border rounded-md shadow flex flex-col items-start gap-4 w-[350px] hover:cursor-pointer bg-inherit '
    >
      <div className='flex items-start w-full gap-4 justify-between'>
        <div className='flex items-center gap-4 flex-1'>
          <Image
            src={'/Job.png'}
            alt='Card Banner Image'
            width={60}
            height={60}
            className='rounded-md object-cover object-center'
          />
          <div className='flex flex-col items-start gap-0'>
            <h3 className='font-semibold text-lg line-clamp-1'>{job.title}</h3>
            <h4 className='uppercase font-bold text-xs opacity-50'>
              {job.company}
            </h4>
          </div>
        </div>
        <JobDropdownMenu jobId={job.id} />
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
      <div className='flex items-center gap-x-4 gap-y-2 flex-wrap'>
        <Badge variant='black'>{job.tags[0]}</Badge>
        <Badge variant='black'>{job.tags[1]}</Badge>
      </div>
      <p className='text-xs opacity-50'>
        Posted on {format(job.createdAt, 'dd MMMM yyyy')}
      </p>
    </motion.div>
  );
}
