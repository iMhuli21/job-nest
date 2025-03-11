import HeaderTitle from '@/components/headerTitle';
import UserJob from '@/components/userJob';
import { Settings, Briefcase, Mail, CalendarDaysIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='Profile' subtitle='Manage your account.' />

      <section className='min-h-dvh space-y-7'>
        <div className='flex items-center justify-center sm:justify-start gap-4 '>
          <Image
            src={'/avatar.png'}
            alt='avatar'
            width={150}
            height={150}
            className='object-cover object-center rounded-full border-2'
            priority
          />
          <div className='flex flex-col items-start gap-2'>
            <div className='flex items-center gap-6'>
              <div className='flex flex-col items-start gap-1'>
                <h3 className='text-lg'>John Doe</h3>
                <span className='text-base opacity-60'>Frontend Developer</span>
              </div>
              <Link href='/settings'>
                <Settings className='opacity-60' />
              </Link>
            </div>
            <div className='flex items-center gap-2'>
              <Briefcase className='opacity-60 size-5' />
              <span className='opacity-60'>Created Jobs</span>
              <span className='font-medium'>+5</span>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8'>
              <div className='flex items-center gap-2'>
                <Mail className='opacity-60 size-5' />
                <span className='opacity-60'>johndoe@gmail.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <CalendarDaysIcon className='opacity-60 size-5' />
                <span className='opacity-60'>Joined, 11 Feb 2025</span>
              </div>
            </div>
          </div>
        </div>
        <p className='text-center text-sm opacity-60'>Jobs you have posted.</p>
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
          <UserJob />
        </div>
      </section>
    </main>
  );
}
