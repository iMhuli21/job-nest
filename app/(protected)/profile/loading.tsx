import React from 'react';
import HeaderTitle from '@/components/headerTitle';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonJob from '@/components/skeletonJob';

export default function loading() {
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='Profile' subtitle='Manage your account.' />

      <section className='min-h-dvh space-y-7'>
        <div className='flex items-center justify-center sm:justify-start gap-4 '>
          <Skeleton className='border-2 w-[150px] h-[150px] rounded-full animate-pulse' />
          <div className='flex flex-col items-start gap-2'>
            <div className='flex items-center gap-6'>
              <div className='flex flex-col items-start gap-3'>
                <Skeleton className='w-[150px] h-5 animate-pulse' />
                <Skeleton className='w-[150px] h-2 animate-pulse' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-[150px] h-5 animate-pulse' />
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8'>
              <Skeleton className='w-[150px] h-5 animate-pulse' />
              <Skeleton className='w-[150px] h-5 animate-pulse' />
            </div>
          </div>
        </div>
        <p className='text-center text-sm opacity-60'>Jobs you have posted.</p>
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
          <SkeletonJob />
        </div>
      </section>
    </main>
  );
}
