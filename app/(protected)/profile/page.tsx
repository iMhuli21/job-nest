import Link from 'next/link';
import { cache } from 'react';
import { auth } from '@/auth';
import prisma from '@/lib/db';
import Image from 'next/image';
import { format } from 'date-fns';
import UserJob from '@/components/userJob';
import { redirect } from 'next/navigation';
import HeaderTitle from '@/components/headerTitle';
import {
  Settings,
  Briefcase,
  Mail,
  CalendarDaysIcon,
  ArrowUpRight,
} from 'lucide-react';
import NotFound from '@/components/notFound';
import Pagination from '@/components/pagination';
import { maxItems } from '@/lib/constants';
import AvatarDialog from '@/components/avatarDialog';

const getProfileData = cache(async (id: string, page: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      avatarUrl: true,
      email: true,
      jobTitle: true,
      createdAt: true,
      contactNumber: true,
      fullName: true,
      cvUrl: true,
      createdJobs: {
        take: maxItems,
        skip: (page - 1) * maxItems,
      },
    },
  });

  const numberOfJobs = await prisma.job.count({
    where: {
      authorId: id,
    },
  });

  const numberOfPages = Math.ceil(numberOfJobs / maxItems);

  return {
    user,
    numberOfPages,
    numberOfJobs,
  };
});

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string | null }>;
}) {
  const session = await auth();

  const { page } = await searchParams;

  if (!session?.user?.id) {
    if (page) {
      const callbackUrl = encodeURIComponent(`/profile?page=${page}`);
      return redirect(`/sign-in?returnUrl=${callbackUrl})}`);
    }
    return redirect(`/sign-in?returnUrl=${encodeURIComponent('/profile')})}`);
  }

  const currentPage = !page ? 1 : Number(page);

  const { user, numberOfPages, numberOfJobs } = await getProfileData(
    session.user.id,
    currentPage
  );

  if (!user) {
    return <NotFound message='User not found.' />;
  }

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='Profile' subtitle='Manage your account.' />

      <section className='min-h-dvh space-y-7'>
        <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4'>
          <AvatarDialog>
            <Image
              src={!user.avatarUrl ? '/avatar.png' : user.avatarUrl}
              alt='avatar'
              width={150}
              height={150}
              className='w-[150px] h-[150px] object-cover object-center rounded-full border-2'
              priority
            />
          </AvatarDialog>
          <div className='flex flex-col items-start gap-2'>
            <div className='flex items-center gap-6'>
              <div className='flex flex-col items-start gap-1'>
                <h3 className='text-lg capitalize'>{user.fullName}</h3>
                <span className='text-base opacity-60 capitalize'>
                  {user.jobTitle}
                </span>
              </div>
              <Link href='/settings'>
                <Settings className='opacity-60' />
              </Link>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8'>
              <a
                href={!user.cvUrl ? '#' : user.cvUrl}
                target='_blank'
                className='flex items-center gap-1 py-2 px-3 bg-muted rounded-md text-sm'
              >
                <span className='opacity-60 font-semibold'>CV</span>
                <ArrowUpRight className='opacity-60 size-4 flex-none' />
              </a>
              <div className='flex items-center gap-2'>
                <Mail className='opacity-60 size-5' />
                <span className='opacity-60'>{user.email}</span>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8'>
              <div className='flex items-center gap-2'>
                <Briefcase className='opacity-60 size-5' />
                <span className='opacity-60'>Created Jobs</span>
                <span className='font-medium'>+{numberOfJobs}</span>
              </div>
              <div className='flex items-center gap-2'>
                <CalendarDaysIcon className='opacity-60 size-5' />
                <span className='opacity-60'>
                  Joined, {format(user.createdAt, 'dd MMMM yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
        {user.createdJobs.length !== 0 && (
          <p className='text-center text-sm opacity-60'>
            Jobs you have posted.
          </p>
        )}
        <div className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
          {user.createdJobs.map((job) => (
            <UserJob key={job.id} job={job} />
          ))}
        </div>
        {user.createdJobs.length === 0 && (
          <div className='text-center opacity-60 font-semibold'>
            No jobs posted...
          </div>
        )}
      </section>
      <Pagination href='/profile' numberOfPages={numberOfPages} />
    </main>
  );
}
