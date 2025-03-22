import prisma from '@/lib/db';
import Image from 'next/image';
import { unstable_cache as cache } from 'next/cache';
import { Button } from '@/components/ui/button';
import HeaderTitle from '@/components/headerTitle';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { Building2, HandCoins, MapPinned, Clock2Icon } from 'lucide-react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import NotFound from '@/components/notFound';
import { format } from 'date-fns';
import { currencyFormatter } from '@/lib/utils';
import RolesAndResponsibilities from '@/components/rolesAndResponsibilities';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const getJob = cache(async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return job;
});

export default async function page({ params }: Props) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    const callbackUrl = encodeURIComponent(`/job/${id}`);
    return redirect(`/sign-in?returnUrl=${callbackUrl}`);
  }

  const job = await getJob(id);

  if (!job) {
    return <NotFound message='Job not found.' />;
  }

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='View job'
        subtitle='Find out all the details of the job.'
      />
      <section className='min-h-dvh w-full max-w-[900px] mx-auto p-4 flex flex-col items-start gap-4'>
        <Image
          src={'/Job.png'}
          alt='Job banner Image'
          width={900}
          height={100}
          className='rounded-t-xl object-cover object-center w-full h-50'
          priority
        />
        <h2 className='text-xl font-semibold'>{job.title}</h2>
        <div className='flex items-center gap-4 w-full justify-between flex-wrap'>
          <div className='flex items-end gap-2 opacity-50'>
            <Building2 className='w-5 h-5' />
            <span className='text-sm capitalize'>{job.company}</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <HiOutlineAdjustmentsVertical className='w-5 h-5' />
            <span className='text-sm capitalize'>{job.experienceLevel}</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <MapPinned className='w-5 h-5' />
            <span className='text-sm capitalize'>{job.location}</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <HandCoins className='w-5 h-5' />
            <span className='text-sm'>{currencyFormatter(job.salary)}</span>
          </div>
          <div className='flex items-end gap-2 opacity-50'>
            <Clock2Icon className='w-5 h-5' />
            <span className='text-sm capitalize'>
              Close date: {format(job.createdAt, 'dd MMMM yyyy')}
            </span>
          </div>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>About Company</h3>
          <p className='text-sm opacity-50'>{job.aboutCompany}</p>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>Description</h3>
          <p className='text-sm opacity-50'>{job.description}</p>
        </div>
        <div className='flex flex-col items-start gap-1'>
          <h3 className='font-medium'>Roles and Responsibilities</h3>
          <RolesAndResponsibilities
            content={job.rolesAndResponsibilities}
            className='text-sm opacity-50 editor'
          />
        </div>
        <Button>Apply</Button>
      </section>
    </main>
  );
}
