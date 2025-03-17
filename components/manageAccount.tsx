import Link from 'next/link';
import Account from './Account';
import Profile from './profile';
import NotFound from './notFound';
import { Button } from '@/components/ui/button';
import { getProfileData } from '@/app/(protected)/profile/page';

export default async function ManageAccount({
  tab,
  userId,
}: {
  tab: string | null;
  userId: string;
}) {
  const user = await getProfileData(userId);

  if (!user) {
    return <NotFound message='User not found.' />;
  }

  return (
    <section className='min-h-dvh grid grid-cols-1 grid-rows-12 sm:grid-cols-12 divide-y-1 sm:divide-x-1 sm:divide-y-0'>
      <aside className='sm:col-span-2 flex flex-col items-center gap-1 p-2 row-span-1 sm:row-span-12'>
        <Button
          asChild
          variant={!tab || tab === 'profile' ? 'ghost' : 'secondary'}
          className='w-full'
        >
          <Link href='/settings?tab=profile'>Profile</Link>
        </Button>
        <Button
          asChild
          variant={tab === 'account' ? 'ghost' : 'secondary'}
          className='w-full rounded'
        >
          <Link href={'/settings?tab=account'}>Account</Link>
        </Button>
      </aside>
      <div className='sm:col-span-10 p-2 row-span-11 sm:row-span-12'>
        {!tab || tab === 'profile' ? (
          <Profile user={user} />
        ) : (
          tab === 'account' && <Account />
        )}
      </div>
    </section>
  );
}
