import { auth } from '@/auth';
import CreateJob from '@/components/createJob';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    const callbackUrl = encodeURIComponent('/job/create');
    return redirect(`/sign-in?returnUrl=${callbackUrl}`);
  }
  return <CreateJob />;
}
