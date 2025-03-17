import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ManageJobs from '@/components/manageJobs';
import HeaderTitle from '@/components/headerTitle';
import CreateJobBtn from '@/components/createJobBtn';

interface Props {
  searchParams: Promise<{
    tab: string | null;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { tab } = await searchParams;

  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='jobs'
        subtitle='These are the latest job opportunities.'
      />
      <section className='min-h-dvh'>
        <ManageJobs tab={tab} />
        <CreateJobBtn />
      </section>
    </main>
  );
}
