import { auth } from '@/auth';
import Applicant from '@/components/applicant';
import HeaderTitle from '@/components/headerTitle';
import NotFound from '@/components/notFound';
import Pagination from '@/components/pagination';
import SearchApplicants from '@/components/searchApplicants';
import { maxItems } from '@/lib/constants';
import prisma from '@/lib/db';
import { isValidJobStatus } from '@/lib/utils';
import { Status } from '@prisma/client';
import { BriefcaseBusiness, Dot, UsersRound } from 'lucide-react';
import { redirect } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page: string | null;
    status: string | null;
    query: string | null;
  }>;
}

const getApplicants = cache(
  async (
    jobId: string,
    page: number,
    query: string | null,
    jobStatus: string
  ) => {
    if (isValidJobStatus(jobStatus)) {
      const job = await prisma.job.findUnique({
        where: {
          id: jobId,
        },
        select: {
          contract: true,
          title: true,
          experienceLevel: true,
        },
      });

      if (!job) {
        return undefined;
      }
      if (query) {
        const applicantsPromise = prisma.application.findMany({
          where: {
            status: {
              equals: jobStatus as Status,
            },
            applicant: {
              fullName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            jobId,
          },
          select: {
            applicant: {
              select: {
                email: true,
                jobTitle: true,
                contactNumber: true,
                fullName: true,
                avatarUrl: true,
                cvUrl: true,
              },
            },
            answers: true,
            id: true,
            status: true,
          },
          take: maxItems,
          skip: (page - 1) * maxItems,
        });

        const numApplicantsPromise = prisma.application.count({
          where: {
            status: {
              equals: jobStatus as Status,
            },
            applicant: {
              fullName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            jobId,
          },
        });

        const [applicants, numApplicants] = await Promise.all([
          applicantsPromise,
          numApplicantsPromise,
        ]);

        const numPages = Math.ceil(numApplicants / maxItems);

        return {
          applicants,
          numPages,
          job,
          numApplicants,
        };
      }

      const applicantsPromise = prisma.application.findMany({
        where: {
          status: {
            equals: jobStatus as Status,
          },
          jobId,
        },
        select: {
          applicant: {
            select: {
              email: true,
              jobTitle: true,
              contactNumber: true,
              fullName: true,
              avatarUrl: true,
              cvUrl: true,
            },
          },
          answers: true,
          id: true,
          status: true,
        },
        take: maxItems,
        skip: (page - 1) * maxItems,
      });

      const numApplicantsPromise = prisma.application.count({
        where: {
          status: {
            equals: jobStatus as Status,
          },
          jobId,
        },
      });

      const [applicants, numApplicants] = await Promise.all([
        applicantsPromise,
        numApplicantsPromise,
      ]);

      const numPages = Math.ceil(numApplicants / maxItems);

      return {
        applicants,
        numPages,
        job,
        numApplicants,
      };
    }
  }
);

export default async function page({ params, searchParams }: Props) {
  const { id } = await params;
  const session = await auth();
  const { page, query, status } = await searchParams;

  if (!session?.user?.id) {
    if (query || status || page) {
      const callbackUrl = encodeURIComponent(
        `/job/${id}/applicants?status=${status}&query=${query}&page=${page}`
      );
      return redirect(`/sign-in?returnUrl=${callbackUrl}`);
    }

    return redirect(
      `/sign-in?returnUrl=${encodeURIComponent(`/job/${id}/applicants`)}`
    );
  }

  const currentPage = page ? Number(page) : 1;

  const jobStatus = status ? status : 'applied';

  const data = await getApplicants(id, currentPage, query, jobStatus);

  if (!data) {
    return <NotFound message='Job not found..' />;
  }

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5 min-h-dvh'>
      <HeaderTitle title='Applicants' subtitle='View all the applicants.' />
      <section className='space-y-3'>
        <div className='flex flex-col items-start gap-1'>
          <h2>{data.job.title}</h2>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-sm'>
              <BriefcaseBusiness className='opacity-50 w-4 h-4 flex-none' />
              <span className='opacity-80'>{data.job.contract}</span>
            </div>
            <div className='flex items-center gap-1 text-sm'>
              <Dot className='opacity-50 w-8 h-8 flex-none' />
              <span className='opacity-80'>{data.job.experienceLevel}</span>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <UsersRound className='opacity-50 w-4 h-4 flex-none' />
              <span className='opacity-80 flex items-center gap-2'>
                <span>{data.numApplicants}</span>Applicants
              </span>
            </div>
          </div>
        </div>
        <SearchApplicants id={id} />
      </section>
      <section className='flex gap-4 items-center md:items-start justify-center xl:justify-start flex-wrap 2xl:grid 2xl:grid-cols-4'>
        {data &&
          data.applicants.map((app) => <Applicant key={app.id} data={app} />)}
      </section>
      {data && data.applicants.length === 0 && (
        <p className='text-center'>No results...</p>
      )}
      {data && (
        <Pagination
          href={`/job/${id}/applicants`}
          numberOfPages={data.numPages}
        />
      )}
    </main>
  );
}
