'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  numberOfPages,
  href,
}: {
  numberOfPages: number;
  href: string;
}) {
  const route = useRouter();

  const search = useSearchParams();

  const tab = search.get('tab') as string;
  const industry = search.get('industry') as string;
  const query = search.get('query') as string;
  const status = search.get('status') as string;

  const currentPage = !search.get('page') ? 1 : Number(search.get('page'));

  const getVisiblePages = () => {
    const visiblePages = [];

    const visiblePaginationPages = 5;

    const startPage = Math.max(
      1,
      currentPage - Math.floor(visiblePaginationPages / 2)
    );

    const endPage = Math.min(
      numberOfPages,
      startPage + visiblePaginationPages - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const paginationPages = getVisiblePages();

  const handlePrevious = () => {
    if (query || status) {
      return route.push(
        `${href}?status=${encodeURIComponent(
          status
        )}&query=${encodeURIComponent(query)}&page=${currentPage - 1}`
      );
    } else if (industry || query) {
      return route.push(
        `${href}?industry=${encodeURIComponent(
          industry
        )}&query=${encodeURIComponent(query)}&page=${currentPage - 1}`
      );
    } else if (tab) {
      return route.push(`${href}?tab=${tab}&page=${currentPage - 1}`);
    }
    return route.push(`${href}?page=${currentPage - 1}`);
  };
  const handleNext = () => {
    if (query || status) {
      return route.push(
        `${href}?status=${encodeURIComponent(
          status
        )}&query=${encodeURIComponent(query)}&page=${currentPage + 1}`
      );
    } else if (industry || query) {
      return route.push(
        `${href}?industry=${encodeURIComponent(
          industry
        )}&query=${encodeURIComponent(query)}&page=${currentPage + 1}`
      );
    } else if (tab) {
      return route.push(`${href}?tab=${tab}&page=${currentPage + 1}`);
    }
    return route.push(`${href}?page=${currentPage + 1}`);
  };

  const handlePagePress = (page: number) => {
    if (query || status) {
      return route.push(
        `${href}?status=${encodeURIComponent(
          status
        )}&query=${encodeURIComponent(query)}&page=${page}`
      );
    } else if (industry || query) {
      return route.push(
        `${href}?industry=${encodeURIComponent(
          industry
        )}&query=${encodeURIComponent(query)}&page=${page}`
      );
    } else if (tab) {
      return route.push(`${href}?tab=${tab}&page=${page}`);
    }
    return route.push(`${href}?page=${page}`);
  };

  return (
    <div className='flex items-center justify-center gap-3'>
      <Button
        className='flex items-center gap-2'
        disabled={currentPage === 1}
        variant={'outline'}
        onClick={handlePrevious}
      >
        <ChevronLeft className='w-4 h-4 flex-none' />
        Previous
      </Button>
      <div className='flex items-center gap-4'>
        {paginationPages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePagePress(page)}
            variant={currentPage === page ? 'outline' : 'ghost'}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        className='flex items-center gap-2'
        disabled={numberOfPages === currentPage || !numberOfPages}
        variant={'outline'}
        onClick={handleNext}
      >
        Next
        <ChevronRight className='w-4 h-4 flex-none' />
      </Button>
    </div>
  );
}
