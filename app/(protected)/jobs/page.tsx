import { auth } from '@/auth';
import prisma from '@/lib/db';
import { maxItems } from '@/lib/constants';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import ManageJobs from '@/components/manageJobs';
import HeaderTitle from '@/components/headerTitle';
import CreateJobBtn from '@/components/createJobBtn';
import Pagination from '@/components/pagination';
import NotFound from '@/components/notFound';

interface Props {
  searchParams: Promise<{
    tab: string | null;
    page: string | null;
  }>;
}

const getJobs = cache(
  async (tab: string | null, page: string | null, userId: string) => {
    const currentPage = !page ? 1 : Number(page);

    if (!tab || tab === 'for-you') {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          jobTitle: true,
        },
      });

      if (!user) {
        return null;
      }

      const jobs = await prisma.job.findMany({
        take: maxItems,
        skip: (currentPage - 1) * maxItems,
        where: {
          title: {
            contains: user.jobTitle,
            mode: 'insensitive',
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const numberOfJobs = await prisma.job.count({
        where: {
          title: {
            contains: user.jobTitle,
            mode: 'insensitive',
          },
        },
      });
      const numPages = Math.ceil(numberOfJobs / maxItems);

      return {
        jobs,
        numPages,
      };
    } else if (tab === 'all') {
      const jobs = await prisma.job.findMany({
        take: maxItems,
        skip: (currentPage - 1) * maxItems,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const numberOfJobs = await prisma.job.count();

      const numPages = Math.ceil(numberOfJobs / maxItems);

      return {
        jobs,
        numPages,
      };
    }
  }
);

export default async function page({ searchParams }: Props) {
  const { tab, page } = await searchParams;

  const session = await auth();

  if (!session?.user?.id) {
    if (tab) {
      const callbackUrl = encodeURIComponent(`/jobs?tab=${tab}`);
      return redirect(`/sign-in?returnUrl=${callbackUrl}`);
    }
    const callbackUrl = encodeURIComponent(`/jobs`);
    return redirect(`/sign-in?returnUrl=${callbackUrl}`);
  }

  const data = await getJobs(tab, page, session.user.id);

  if (!data) {
    return <NotFound message='Jobs not found..' />;
  }

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='jobs'
        subtitle='These are the latest job opportunities.'
      />
      <section className='min-h-dvh'>
        <ManageJobs tab={tab} data={data} />
        {data?.jobs.length === 0 && (
          <div className='flex items-center justify-center font-semibold opacity-60 mt-10'>
            No Jobs Available.
          </div>
        )}
        <CreateJobBtn />
      </section>
      <Pagination href={'/jobs'} numberOfPages={data.numPages} />
    </main>
  );
}
