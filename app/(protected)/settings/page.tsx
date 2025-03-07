import ManageAccount from '@/components/manageAccount';

interface Props {
  searchParams: Promise<{
    tab: string | null;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { tab } = await searchParams;
  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <div className='flex flex-col items-center justify-center gap-1'>
        <h2 className='font-[family-name:var(--font-bebas_neue)] text-2xl text-center'>
          Settings
        </h2>
        <span className='opacity-60'>Manage your account.</span>
      </div>
      <ManageAccount tab={tab} />
    </main>
  );
}
