import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SearchComponent from '@/components/searchComponent';

interface Props {
  searchParams: Promise<{
    page: string | null;
    industry: string | null;
    query: string | null;
  }>;
}

export default async function page({ searchParams }: Props) {
  const session = await auth();

  const { industry, page, query } = await searchParams;

  if (!session?.user?.id) {
    if (industry || page || query) {
      const callbackUrl = encodeURIComponent(
        `/search?industry=${industry}&query=${query}&page=${page}`
      );
      return redirect(`/sign-in?returnUrl=${callbackUrl}`);
    }
    return redirect(`/sign-in?returnUrl=${'/search'}`);
  }

  return <SearchComponent />;
}
