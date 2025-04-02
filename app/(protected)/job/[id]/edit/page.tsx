import { auth } from '@/auth';
import EditJob from '@/components/editJob';
import NotFound from '@/components/notFound';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const getJob = cache(async (jobId: string, userId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
      authorId: userId,
    },
  });

  return job;
});

export default async function page({ params }: Props) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    const callbackUrl = encodeURIComponent(`/job/${id}/edit`);
    return redirect(`/sign-in?returnUrl=${callbackUrl}`);
  }

  const job = await getJob(id, session.user.id);

  if (!job) {
    return <NotFound message='Job not found...' />;
  }
  return <EditJob job={job} />;
}
