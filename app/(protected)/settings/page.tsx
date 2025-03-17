import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import HeaderTitle from '@/components/headerTitle';
import ManageAccount from '@/components/manageAccount';

interface Props {
  searchParams: Promise<{
    tab: string | null;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { tab } = await searchParams;

  const session = await auth();

  if (!session?.user?.id) {
    if (tab) {
      const callbackUrl = encodeURIComponent(`/settings?tab=${tab}`);
      return redirect(`/sign-in?returnUrl=${callbackUrl}`);
    }
    const callbackUrl = encodeURIComponent(`/settings`);
    return redirect(`/sign-in?returnUrl=${callbackUrl}`);
  }

  return (
    <main className='px-4 font-[family-name:var(--font-nunito)] space-y-10 py-5'>
      <HeaderTitle title='Settings' subtitle='Manage your account.' />
      <ManageAccount tab={tab} userId={session.user.id} />
    </main>
  );
}
