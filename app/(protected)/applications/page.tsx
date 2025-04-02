import { auth } from '@/auth';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import HeaderTitle from '@/components/headerTitle';

const getAppliedJobs = cache(async (userId: string) => {
  const appliedJobs = await prisma.application.findMany({
    where: {
      applicantId: userId,
    },
    select: {
      job: {
        select: {
          title: true,
          company: true,
          closeDate: true,
          id: true,
        },
      },

      createdAt: true,
      status: true,
      id: true,
    },
  });

  return appliedJobs;
});

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/sign-in?returnUrl=${encodeURIComponent('/applications')}`);
  }

  const appliedJobs = await getAppliedJobs(session.user.id);

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5 min-h-dvh'>
      <HeaderTitle
        title='Applied Jobs'
        subtitle='View all the jobs you have applied for'
      />
      <DataTable columns={columns} data={appliedJobs} />
    </main>
  );
}
