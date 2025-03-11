import HeaderTitle from '@/components/headerTitle';
import ManageJobs from '@/components/manageJobs';

interface Props {
  searchParams: Promise<{
    tab: string | null;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { tab } = await searchParams;
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle
        title='jobs'
        subtitle='These are the latest job opportunities.'
      />
      <section className='min-h-dvh'>
        <ManageJobs tab={tab} />
      </section>
    </main>
  );
}
